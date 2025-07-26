/**
 * Footer Component - Grupo Naser CMS
 * Footer principal pixel perfect con información completa
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const locations = [
    {
      name: 'Naser Aragón',
      address: 'Av. Río Churubusco 1236, Sector Popular, Iztapalapa',
      phone: '55 5555 5555',
      path: '/naser-aragon'
    },
    {
      name: 'Naser Morelos',
      address: 'Av. Morelos 123, Centro, Cuauhtémoc',
      phone: '55 5555 5556',
      path: '/naser-morelos'
    },
    {
      name: 'Naser Oaxaca',
      address: 'Av. Oaxaca 456, Roma Norte, Cuauhtémoc',
      phone: '55 5555 5557',
      path: '/naser-oaxaca'
    },
    {
      name: 'Naser Tlalpan',
      address: 'Av. Tlalpan 789, Portales, Benito Juárez',
      phone: '55 5555 5558',
      path: '/naser-tlalpan'
    }
  ];

  const quickLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Historia', path: '/historia' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Necesidad Inmediata', path: '/necesidad-inmediata' },
    { label: 'Previsión', path: '/prevision' },
    { label: 'Cobertura', path: '/cobertura' },
    { label: 'Obituario', path: '/obituario' },
    { label: 'Contacto', path: '/contacto' }
  ];

  const services = [
    'Servicios Funerarios Completos',
    'Traslados Nacionales e Internacionales',
    'Cremación',
    'Velatorios',
    'Trámites Legales',
    'Ataúdes y Urnas',
    'Flores y Coronas',
    'Servicios Religiosos'
  ];

  return (
    <footer className={`${styles.footer} ${className || ''}`} role="contentinfo">
      {/* Sección principal del footer */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Información de la empresa */}
            <div className={styles.companyInfo}>
              <Link to="/" className={styles.footerLogo}>
                <img
                  src="/assets/images/logo-naser-white.svg"
                  alt="Grupo Naser - Servicios Funerarios"
                  className={styles.logoImage}
                  width="180"
                  height="60"
                />
              </Link>
              <p className={styles.companyDescription}>
                Con más de 25 años de experiencia, Grupo Naser ofrece servicios funerarios
                de calidad con el respeto y la dignidad que su familia merece. Estamos aquí
                para acompañarlos en los momentos más difíciles.
              </p>
              <div className={styles.emergencyInfo}>
                <h4 className={styles.emergencyTitle}>
                  <i className="fas fa-phone-alt" aria-hidden="true"></i>
                  Servicio 24 Horas
                </h4>
                <a href="tel:+525555555555" className={styles.emergencyPhone}>
                  55 5555 5555
                </a>
                <p className={styles.emergencyText}>
                  Línea de emergencia disponible los 365 días del año
                </p>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Enlaces Rápidos</h3>
              <ul className={styles.linksList}>
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Nuestros Servicios</h3>
              <ul className={styles.servicesList}>
                {services.map((service, index) => (
                  <li key={index} className={styles.serviceItem}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ubicaciones */}
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Nuestras Ubicaciones</h3>
              <div className={styles.locationsList}>
                {locations.map((location) => (
                  <div key={location.path} className={styles.locationItem}>
                    <h4 className={styles.locationName}>
                      <Link to={location.path} className={styles.locationLink}>
                        {location.name}
                      </Link>
                    </h4>
                    <p className={styles.locationAddress}>
                      <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                      {location.address}
                    </p>
                    <a href={`tel:+52${location.phone.replace(/\s/g, '')}`} className={styles.locationPhone}>
                      <i className="fas fa-phone" aria-hidden="true"></i>
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de contacto y redes sociales */}
      <div className={styles.footerContact}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Información de contacto */}
            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Mantente en Contacto</h3>
              <div className={styles.contactItems}>
                <a href="mailto:contacto@naser.com.mx" className={styles.contactItem}>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <div>
                    <strong>Email</strong>
                    <span>contacto@naser.com.mx</span>
                  </div>
                </a>
                <a href="tel:+525555555555" className={styles.contactItem}>
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <div>
                    <strong>Teléfono Principal</strong>
                    <span>55 5555 5555</span>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <i className="fas fa-clock" aria-hidden="true"></i>
                  <div>
                    <strong>Horario de Atención</strong>
                    <span>24 horas, 365 días del año</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Síguenos</h3>
              <p className={styles.socialDescription}>
                Mantente informado sobre nuestros servicios y noticias importantes
              </p>
              <div className={styles.socialLinks}>
                <a 
                  href="https://facebook.com/gruponaser" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Seguir en Facebook"
                  className={styles.socialLink}
                >
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://instagram.com/gruponaser" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Seguir en Instagram"
                  className={styles.socialLink}
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://wa.me/5255555555555" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                  className={styles.socialLink}
                >
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  <span>WhatsApp</span>
                </a>
                <a 
                  href="https://youtube.com/gruponaser" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Suscribirse en YouTube"
                  className={styles.socialLink}
                >
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>
                © {currentYear} Grupo Naser. Todos los derechos reservados.
              </p>
              <p className={styles.subtitle}>
                Servicios funerarios con respeto y dignidad desde 1998.
              </p>
            </div>
            <div className={styles.legalLinks}>
              <Link to="/aviso-privacidad" className={styles.legalLink}>
                Aviso de Privacidad
              </Link>
              <Link to="/terminos-condiciones" className={styles.legalLink}>
                Términos y Condiciones
              </Link>
              <Link to="/politica-cookies" className={styles.legalLink}>
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de WhatsApp flotante */}
      <a 
        href="https://wa.me/5255555555555?text=Hola,%20necesito%20información%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </a>
    </footer>
  );
}

export default Footer;