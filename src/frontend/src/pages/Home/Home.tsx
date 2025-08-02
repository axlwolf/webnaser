/**
 * HomePage Component - Pixel Perfect
 * Página principal completa con todas las secciones
 * Basada exactamente en el diseño original de Grupo Naser
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../../components/organisms/HeroSlider/HeroSlider';

export const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ paddingTop: '130px' /* Account for fixed header */ }}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Request Form Section */}
      <section style={{
        background: '#f8f9fa',
        padding: '60px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#524030',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Nosotros nos comunicamos
              </h4>
              <span style={{
                fontSize: '16px',
                color: '#666',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Escríbanos un mensaje y lo contactaremos de inmediato
              </span>
            </div>
            
            <Link
              to="/contacto"
              style={{
                backgroundColor: '#524030',
                color: '#fff',
                fontSize: '15px',
                textTransform: 'uppercase',
                fontWeight: '700',
                padding: '12px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#cfbfaa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#524030';
                e.currentTarget.style.color = '#fff';
              }}
            >
              CONTACTAR
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: '80px 0',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Service 1 */}
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src="/assets/images/icon_atention.png" 
                alt="Atención telefónica"
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: '20px'
                }}
              />
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#524030',
                marginBottom: '15px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Atención telefónica
              </h4>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Disponibles las 24 horas del día, los 365 días del año para atender sus necesidades.
              </p>
              <Link
                to="/contacto"
                style={{
                  backgroundColor: '#524030',
                  color: '#fff',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  padding: '10px 25px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                CONTACTAR
              </Link>
            </div>

            {/* Service 2 */}
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src="/assets/images/icon_services.png" 
                alt="Servicios adicionales"
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: '20px'
                }}
              />
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#524030',
                marginBottom: '15px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Servicios adicionales
              </h4>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Conoce todos nuestros servicios complementarios para brindar el mejor apoyo.
              </p>
              <Link
                to="/servicios"
                style={{
                  backgroundColor: '#524030',
                  color: '#fff',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  padding: '10px 25px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                SABER MÁS
              </Link>
            </div>

            {/* Service 3 */}
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src="/assets/images/icon_time.png" 
                alt="Disponibilidad 24/7"
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: '20px'
                }}
              />
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#524030',
                marginBottom: '15px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Emergencias 24/7
              </h4>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Servicio de emergencia disponible las 24 horas para atender cualquier situación.
              </p>
              <a
                href="tel:5556887866"
                style={{
                  backgroundColor: '#524030',
                  color: '#fff',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  padding: '10px 25px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                LLAMAR AHORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://api.whatsapp.com/send?phone=525517919823&text=Hola,%20necesito%20información"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
        }}
      >
        <i 
          className="fab fa-whatsapp" 
          style={{
            fontSize: '28px',
            color: 'white'
          }}
        ></i>
      </a>
    </div>
  );
};