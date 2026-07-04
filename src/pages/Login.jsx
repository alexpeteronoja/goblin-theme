import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login success
    navigate('/');
  };

  return (
    <div className="w-full bg-[#f4f4f0] min-h-[calc(100vh-100px)] text-ald-black flex justify-center pt-32 pb-24 px-4 md:px-8">
      
      <div className="w-full max-w-[400px]">
        
        <h1 className="text-lg font-bold uppercase tracking-widest mb-10 text-center md:text-left">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-8 mb-12">
          
          <div className="relative">
            <input 
              type="email" 
              placeholder="EMAIL"
              required
              className="w-full bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none placeholder-gray-500"
            />
          </div>

          <div className="relative">
            <input 
              type="password" 
              placeholder="PASSWORD"
              required
              className="w-full bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none placeholder-gray-500"
            />
          </div>

          <Link to="#" className="text-[10px] md:text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors -mt-4">
            Forgot Password?
          </Link>

          <button 
            type="submit"
            className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-800"
          >
            Sign In
          </button>

        </form>

        <div className="flex flex-col gap-4">
          <Link 
            to="/account/register"
            className="w-full bg-transparent border border-black text-black text-center text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-100 block"
          >
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}
