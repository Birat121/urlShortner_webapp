import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 pt-8 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow-md"
        >
          NepLinkr
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-indigo-600 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition duration-200 text-sm"
          >
            Login
          </Link>
          
        </div>
      </div>

      {/* Mobile Menu (Overlayed) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-2 py-4 sm:hidden z-50">
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-11/12 max-w-xs text-center px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition duration-200"
          >
            Login
          </Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
