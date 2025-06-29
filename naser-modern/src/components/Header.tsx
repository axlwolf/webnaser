"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Necesidad Inmediata", path: "/necesidad-inmediata" },
    { label: "Previsión", path: "/prevision" },
    { label: "Servicios", path: "/servicios" },
    { label: "Obituario", path: "/obituario" },
    { label: "Contacto", path: "/contacto" },
    { label: "Nosotros", path: "/nosotros" },
  ];

  return (
    <>
      {/* Sub-header */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <a href="mailto:gruponaser@naser.com" className="flex items-center space-x-2">
                <i className="fa fa-envelope"></i>
                <span>info@naser.com.mx</span>
              </a>
              <a href="tel:5556887866" className="flex items-center space-x-2">
                <i className="fa fa-phone"></i>
                <span>55 5688 7866</span>
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/funerariasnaser/?app=fbl" className="flex items-center">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="https://www.facebook.com/funerariasnaser/?app=fbl" className="flex items-center">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/funerariasnaser/?app=fbl" className="flex items-center">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <img src="/assets/images/logo_naser.png" alt="Grupo Naser" className="w-24" />
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-medium ${
                  pathname === item.path
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-gray-700">Menu</span>
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 py-2">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block font-medium ${
                      pathname === item.path
                        ? "text-blue-600 font-bold"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
