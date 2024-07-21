import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setName('')
    setEmail('')
    setPassword('')

    const formData = {
      username: name,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post('http://localhost:3300/auth/signup', formData);
      setMessage('Sign up successful!');
      console.log(res);
    }catch (err) {
      setMessage('Sign up failed.');
      console.error(err);
    }
  
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

     

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />

{message && <p className="text-center my-3">{message}</p>}

        <button type="submit" className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Sign Up
        </button>
      </form>

      <div>
        <p>
          Already have an account?{' '}
          <Link to="/signin">
            <span className="text-red-700 font-bold">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
