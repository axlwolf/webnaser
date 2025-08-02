/**
 * Header Component - Pixel Perfect
 * Header principal con efectos de scroll
 * Basado exactamente en el diseño original de Grupo Naser
 */

import React, { useState, useEffect } from "react";
import { TopBar } from "../TopBar";
import { MainHeader } from "../MainHeader";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'white' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: isScrolled ? '3px solid #c8a97e' : 'none',
        transition: 'all 0.3s ease-in-out'
      }}
      className={className}
    >
      <TopBar />
      <MainHeader />
    </header>
  );
}

export default Header;