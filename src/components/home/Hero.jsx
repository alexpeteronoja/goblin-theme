import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  // You can replace these with your actual image paths
  const desktopImage = "/header.png";
  const mobileImage = "/300A9108.jpg"; // Your mobile image here

  return (
    <Link to="/shop" className="block relative w-full h-screen group cursor-pointer overflow-hidden">

      {/* Mobile Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 block md:hidden"
        style={{
          backgroundImage: `url("${mobileImage}")`,
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Desktop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-102 hidden md:block"
        style={{
          backgroundImage: `url("${desktopImage}")`,
          backgroundPosition: 'center 40%'
        }}
      ></div>

      {/* Visually hidden text for SEO, or very subtle CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 px-4 text-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-white text-[10px] uppercase tracking-[0.2em] font-medium border-b border-transparent group-hover:border-white transition-all pb-1">
          Enter Shop
        </span>
      </div>
    </Link>
  );
}
