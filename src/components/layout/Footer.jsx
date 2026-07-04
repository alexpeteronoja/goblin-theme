import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-ald-black border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="uppercase text-[11px] tracking-widest font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex border-b border-gray-300 pb-2 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              />
              <button 
                type="submit" 
                className="uppercase text-[10px] tracking-widest font-bold hover:text-gray-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="uppercase text-[11px] tracking-widest font-bold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-ald-black transition-colors">About Us</Link></li>
              <li><Link to="/stores" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Stores</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Careers</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="uppercase text-[11px] tracking-widest font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-sm text-gray-500 hover:text-ald-black transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Contact Us</Link></li>
              <li><Link to="/accessibility" className="text-sm text-gray-500 hover:text-ald-black transition-colors">Accessibility</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aimé Leon Dore. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ald-black transition-colors uppercase tracking-widest">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-ald-black transition-colors uppercase tracking-widest">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-ald-black transition-colors uppercase tracking-widest">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
