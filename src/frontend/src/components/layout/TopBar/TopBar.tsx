/**
 * TopBar Component - Pixel Perfect
 * Barra superior con información de contacto y redes sociales
 * Basado exactamente en el diseño original de Grupo Naser
 */

import React from 'react';

export const TopBar: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#524030',
      height: '50px',
      lineHeight: '50px'
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
          <a 
            href="tel:5556887866" 
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-phone"></i>
            <span>55 5688 7866</span>
          </a>
          <a 
            href="mailto:info@naser.com.mx" 
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-envelope"></i>
            <span>info@naser.com.mx</span>
          </a>
          <span style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-map-marker-alt"></i>
            <span>Ciudad de México</span>
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="https://www.facebook.com/funerariasnaser/?app=fbl" 
            aria-label="Facebook"
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a 
            href="#" 
            aria-label="Instagram"
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href="#" 
            aria-label="WhatsApp"
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }}
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
};