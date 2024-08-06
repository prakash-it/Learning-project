import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3300/auth/signin', {
        email,
        password,
      });
      console.log('Response:', response.data);
      setMessage(response.data.message || 'Signed in successfully!');
    
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          required
        />

        {message && <p className="text-center my-3">{message}</p>}

        <button type="submit" className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Sign In
        </button>
      </form>

      <div>
        <p>
          Don't have an account?{' '}
          <Link to="/signup">
            <span className="text-red-700 font-bold">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
