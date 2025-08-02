import React from 'react';
import { TEXTS } from '../../../constants/texts';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.company}>
            <h3 className={styles.companyName}>{TEXTS.company.name}</h3>
            <p className={styles.companyDescription}>
              {TEXTS.company.description}
            </p>
          </div>
          
          <div className={styles.contact}>
            <h4 className={styles.sectionTitle}>{TEXTS.contact.title}</h4>
            <div className={styles.contactInfo}>
              <p>📞 {TEXTS.company.phone}</p>
              <p>✉️ {TEXTS.company.email}</p>
              <p>📍 {TEXTS.company.address}</p>
            </div>
          </div>
          
          <div className={styles.emergency}>
            <h4 className={styles.sectionTitle}>{TEXTS.navigation.emergency}</h4>
            <p>{TEXTS.contact.emergency.subtitle}</p>
            <div className={styles.emergencyButtons}>
              <a 
                href={`tel:${TEXTS.company.phone}`}
                className={styles.emergencyButton}
              >
                📞 {TEXTS.contact.emergency.callNow}
              </a>
              <a 
                href={`https://wa.me/52${TEXTS.company.whatsapp.replace(/\s/g, '')}`}
                className={styles.emergencyButton}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {TEXTS.company.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};