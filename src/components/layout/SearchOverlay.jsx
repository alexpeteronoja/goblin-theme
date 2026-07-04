import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, X } from "lucide-react";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Prevent background scroll when search overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans text-ald-black bg-white">
      {/* Search Header */}
      <div className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between border-b border-gray-200 bg-white">
        {/* Empty left spacer to center the logo and push the close button to the right */}
        <div className="flex-1"></div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link
            to="/"
            onClick={onClose}
            className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] whitespace-nowrap"
          >
            Aimé Leon Dore
          </Link>
        </div>

        {/* Right: Close Button */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto px-6 md:px-8 py-10 lg:py-20 flex flex-col">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left Column: Input & Recommendations */}
          <div className="flex-1 flex flex-col">
            <form onSubmit={handleSearch} className="relative mb-12">
              <input
                type="text"
                placeholder="SEARCH"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-2xl lg:text-3xl uppercase tracking-widest border-b border-black pb-4 focus:outline-none placeholder-gray-400 bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-0 top-1 text-black hover:opacity-70 transition-opacity"
              >
                <Search className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </form>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6">
                Recommendations
              </h3>
              <ul className="space-y-4 text-[12px] uppercase tracking-widest text-gray-500 font-medium">
                <li>
                  <Link
                    to="/shop/new-arrivals"
                    onClick={onClose}
                    className="hover:text-black transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/footwear"
                    onClick={onClose}
                    className="hover:text-black transition-colors"
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/uniform"
                    onClick={onClose}
                    className="hover:text-black transition-colors"
                  >
                    Uniform
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/headwear"
                    onClick={onClose}
                    className="hover:text-black transition-colors"
                  >
                    Headwear
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Visual Features */}
          <div className="flex-1 flex flex-col sm:flex-row gap-8">
            <Link
              to="/lookbook"
              onClick={onClose}
              className="flex-1 group cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
                  alt="Lookbook"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest group-hover:opacity-70 transition-opacity">
                Spring / Summer 2026
              </h4>
            </Link>

            <Link
              to="/news"
              onClick={onClose}
              className="flex-1 group cursor-pointer hidden sm:block"
            >
              <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop"
                  alt="Editorial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest group-hover:opacity-70 transition-opacity">
                The Latest
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
