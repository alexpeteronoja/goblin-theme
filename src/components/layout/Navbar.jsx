import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, UserRound, ShoppingCart } from "lucide-react";
import NavigationDrawer from "./NavigationDrawer";
import SearchOverlay from "./SearchOverlay";
import useCartStore from "../../store/useCartStore";
import { logoHead } from "../../assets";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Dynamic Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
      };
      const dateString = now.toLocaleDateString("en-US", options);
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setCurrentTime(`Queens, NY | ${dateString} | ${timeString}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Smart Header Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update solid/transparent state
      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // If on home, header is transparent at top and text is white.
  // If not on home, header is solid white and text is black.
  const headerBgClass = isHome
    ? isScrolled
      ? "bg-white text-ald-black border-b border-gray-200"
      : "bg-transparent text-white"
    : "bg-white text-ald-black border-b border-gray-200";

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${headerBgClass} ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseEnter={() => isHome && !isScrolled && setIsScrolled(true)}
        onMouseLeave={() =>
          isHome && window.scrollY <= 50 && setIsScrolled(false)
        }
      >
        <div className="px-6 md:px-8 py-5 md:py-6 flex items-center justify-between">
          {/* Left Side: Hamburger Menu */}
          <div className="flex-1 flex items-center">
            <button
              className="hover:opacity-70 transition-opacity"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link
              to="/"
              className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] whitespace-nowrap"
            >
              Goblin
            </Link>
          </div>

          {/* Right Side: Search, Sign In, Time */}
          <div className="flex-1 flex justify-end items-center space-x-6 text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium">
            <button
              className="cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/account/login"
              className="hover:opacity-70 transition-opacity hidden md:block whitespace-nowrap"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </Link>

            {/* <div className="hidden lg:block text-gray-400 whitespace-nowrap border-l border-gray-300 pl-6 ml-6 h-4 flex items-center">
              {currentTime}
            </div> */}

            {/* Mobile Cart (Often present) */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold tracking-tighter">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
