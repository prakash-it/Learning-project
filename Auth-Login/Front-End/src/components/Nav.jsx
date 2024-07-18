import React from 'react';
import { Link } from 'react-router-dom';


export default function Nav() {
  return (
    <nav className='bg-violet-600 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-slate-700'>PC-creation</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'><li className='text-slate-700 hover:text-white'>Home</li></Link>
          <Link to='/about'><li className='text-slate-700 hover:text-white'>About</li></Link>
          <Link to='signup'><li className='text-slate-700 hover:text-white'>Signin</li></Link>
          <Link to='signin'><li className='text-slate-700 hover:text-white'>Sigin</li></Link>
        </ul>
      </div>
    </nav>
  );
}
