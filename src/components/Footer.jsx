import React from "react";
import { FaFacebookF,  FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center py-8 px-6 text-gray-700">
      <section className="flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-10 max-w-4xl mx-auto flex-wrap">
        {/* Branding */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">NepLinkr</h1>
        </div>

        {/* Social Links */}
        <div>
          <ul className="flex gap-6 justify-center sm:justify-start text-gray-600 text-xl">
            <li className="hover:text-indigo-600 transition">
              <Link to="https://www.facebook.com/virat.budhathoki88" aria-label="Facebook">
                <FaFacebookF />
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link to="https://www.linkedin.com/in/birat-budhathoki-075427269/" aria-label="LinkedIn">
                <FaLinkedinIn />
              </Link>
            </li>
            <li className="hover:text-indigo-600 transition">
              <Link to="#" aria-label="Instagram">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Copyright */}
      <div className="mt-6 text-lg text-gray-500">
        &copy; {new Date().getFullYear()} NepLinkr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
