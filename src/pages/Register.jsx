import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock register success
    navigate('/');
  };

  return (
    <div className="w-full bg-[#f4f4f0] min-h-[calc(100vh-100px)] text-ald-black flex justify-center pt-32 pb-24 px-4 md:px-8">
      
      <div className="w-full max-w-[400px]">
        
        <h1 className="text-lg font-bold uppercase tracking-widest mb-10 text-center md:text-left">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-8 mb-12">
          
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="FIRST NAME"
                required
                className="w-full bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="LAST NAME"
                required
                className="w-full bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>

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

          <div className="relative">
            <select 
              required
              className="w-full appearance-none bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none text-gray-500 cursor-pointer"
            >
              <option value="" disabled selected>COUNTRY</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="FR">France</option>
            </select>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="BIRTHDAY (MM/DD/YYYY)"
              className="w-full bg-transparent border-b border-black pb-3 text-[11px] md:text-[12px] uppercase tracking-widest focus:outline-none placeholder-gray-500"
            />
          </div>

          <div className="flex items-start gap-3 mt-2">
            <input 
              type="checkbox" 
              id="newsletter" 
              className="mt-1 w-4 h-4 rounded-none border-black text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="newsletter" className="text-[10px] md:text-[11px] text-gray-500 tracking-widest uppercase cursor-pointer">
              Subscribe to receive updates, access to exclusive deals, and more.
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input 
              type="checkbox" 
              id="terms" 
              required
              className="mt-1 w-4 h-4 rounded-none border-black text-black focus:ring-black cursor-pointer"
            />
            <label htmlFor="terms" className="text-[10px] md:text-[11px] text-gray-500 tracking-widest uppercase cursor-pointer">
              I have read and agree to the <Link to="#" className="underline">Terms of Service</Link> and <Link to="#" className="underline">Privacy Policy</Link>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-800 mt-4"
          >
            Create
          </button>

        </form>

        <div className="flex flex-col gap-4">
          <Link 
            to="/account/login"
            className="w-full bg-transparent border border-black text-black text-center text-[12px] font-bold uppercase tracking-[0.2em] py-4 transition-colors hover:bg-gray-100 block"
          >
            Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}
