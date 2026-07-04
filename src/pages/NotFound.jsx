import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full bg-[#f4f4f0] min-h-[calc(100vh-100px)] text-ald-black flex flex-col items-center justify-center pt-32 pb-24 px-4 md:px-8 text-center">
      
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-6">
        404
      </h1>
      
      <h2 className="text-[12px] md:text-[14px] uppercase tracking-widest font-bold mb-8">
        Page Not Found
      </h2>
      
      <p className="text-[11px] md:text-[12px] uppercase tracking-widest text-gray-500 mb-12 max-w-[400px]">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link 
        to="/"
        className="bg-black text-white px-12 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-gray-800"
      >
        Return to Homepage
      </Link>
      
    </div>
  );
}
