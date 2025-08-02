/**
 * MainHeader Component - Pixel Perfect
 * Header principal con logo y navegación
 * Basado exactamente en el diseño original de Grupo Naser
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { path: '/', label: 'Inicio' },
  { path: '/necesidad-inmediata', label: 'Necesidad Inmediata' },
  { path: '/prevision', label: 'Previsión' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/obituario', label: 'Obituario' },
  { path: '/contacto', label: 'Contacto' },
  { path: '/nosotros', label: 'Nosotros' }
];

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div style={{
      background: 'white',
      padding: '16px 0',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#c8a97e', // Dorado Naser
            fontFamily: 'Poppins, sans-serif'
          }}>
            GRUPO NASER
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: '#333',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                ...(location.pathname === item.path ? {
                  color: '#c8a97e',
                  borderBottom: '3px solid #c8a97e'
                } : {})
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: '#333',
            margin: '4px 0',
            transition: 'all 0.3s'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#333',
            margin: '4px 0',
            transition: 'all 0.3s'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#333',
            margin: '4px 0',
            transition: 'all 0.3s'
          }}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '130px', // TopBar (50px) + MainHeader (80px)
          left: 0,
          right: 0,
          background: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          padding: '20px'
        }}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              style={{
                display: 'block',
                padding: '12px 20px',
                color: '#333',
                textDecoration: 'none',
                borderBottom: '1px solid #eee',
                ...(location.pathname === item.path ? {
                  color: '#c8a97e',
                  background: '#f8f9fa'
                } : {})
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        ></div>
      )}
    </div>
  );
};