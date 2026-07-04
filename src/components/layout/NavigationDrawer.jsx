import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function NavigationDrawer({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('SHOP');

  const shopCategories = [
    'ALL PRODUCTS', 'NEW ARRIVALS', "WOMEN'S CAPSULE", 'TEES & POLOS', 
    'SWEATSHIRTS', 'SHIRTING', 'SWEATERS', 'PANTS', 'SWEATPANTS', 
    'SHORTS', 'SWIM', 'OUTERWEAR', 'SUITING', 'FOOTWEAR', 
    'HEADWEAR', 'JEWELRY'
  ];

  const exploreLinks = [
    'SS26 LOOKBOOK', 'COLLECTIONS', 'NEWS', 'ABOUT US', 
    'STORES', 'CAFÉ', 'SONNY', 'SOUND'
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] md:w-[350px] bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Header / Tabs */}
        <div className="flex border-b border-gray-200 relative pt-12 md:pt-16 px-6 md:px-8">
          <button 
            className="absolute top-6 right-6 hover:opacity-50 transition-opacity"
            onClick={onClose}
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          <button 
            className={`pb-4 mr-8 uppercase text-xs tracking-[0.2em] font-medium transition-colors ${
              activeTab === 'SHOP' ? 'border-b-2 border-ald-black text-ald-black' : 'text-gray-400 hover:text-ald-black border-b-2 border-transparent'
            }`}
            onClick={() => setActiveTab('SHOP')}
          >
            Shop
          </button>
          <button 
            className={`pb-4 uppercase text-xs tracking-[0.2em] font-medium transition-colors ${
              activeTab === 'EXPLORE' ? 'border-b-2 border-ald-black text-ald-black' : 'text-gray-400 hover:text-ald-black border-b-2 border-transparent'
            }`}
            onClick={() => setActiveTab('EXPLORE')}
          >
            Explore
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 custom-scrollbar">
          {activeTab === 'SHOP' ? (
            <nav className="flex flex-col space-y-4">
              {shopCategories.map((cat, idx) => (
                <Link 
                  key={idx} 
                  to="/shop" 
                  onClick={onClose}
                  className={`uppercase text-[11px] tracking-[0.15em] font-medium hover:text-gray-500 transition-colors ${
                    cat === 'ALL PRODUCTS' ? 'mb-4' : ''
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </nav>
          ) : (
            <nav className="flex flex-col space-y-4">
              {exploreLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  to="/explore" 
                  onClick={onClose}
                  className="uppercase text-[11px] tracking-[0.15em] font-medium hover:text-gray-500 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Bottom Utility Links */}
        <div className="border-t border-gray-200 px-6 md:px-8 py-8 flex flex-col space-y-4 text-[10px] uppercase tracking-[0.15em] text-gray-500">
          <Link to="/account" onClick={onClose} className="hover:text-ald-black transition-colors">Sign In</Link>
          <Link to="/cart" onClick={onClose} className="hover:text-ald-black transition-colors">Cart (0)</Link>
          <button className="text-left hover:text-ald-black transition-colors">Global (USD)</button>
        </div>
      </div>
    </>
  );
}
