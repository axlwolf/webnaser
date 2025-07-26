/**
 * Header Simple - Versión simplificada para diagnóstico
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function HeaderSimple() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderBottom: '3px solid #c8a97e'
    }}>
      {/* Sub-header */}
      <div style={{
        background: '#1e2b4d',
        color: 'white',
        padding: '8px 0',
        fontSize: '14px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="tel:5556887866" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-phone"></i>
              <span>55 5688 7866</span>
            </a>
            <a href="mailto:info@naser.com.mx" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-envelope"></i>
              <span>info@naser.com.mx</span>
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-map-marker-alt"></i>
              <span>Ciudad de México</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Header principal */}
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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#c8a97e',
              fontFamily: 'Poppins, sans-serif'
            }}>
              GRUPO NASER
            </div>
          </Link>

          {/* Navegación */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#333', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
              Inicio
            </Link>
            <Link to="/servicios" style={{ color: '#333', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
              Servicios
            </Link>
            <Link to="/nosotros" style={{ color: '#333', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
              Nosotros
            </Link>
            <Link to="/sucursales" style={{ color: '#333', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
              Sucursales
            </Link>
            <Link to="/contacto" style={{ color: '#333', textDecoration: 'none', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}>
              Contacto
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            to="/emergencia" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              background: '#c8a97e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(200, 169, 126, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            <i className="fas fa-phone-alt" style={{ fontSize: '16px' }}></i>
            <div>
              <div style={{ fontSize: '14px', lineHeight: '1.2' }}>Necesidad Inmediata</div>
              <div style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.2' }}>24/7 Disponible</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}