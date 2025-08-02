import React from 'react';
import { TEXTS } from '../../constants/texts';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {TEXTS.company.fullName}
          </h1>
          <p className={styles.heroSubtitle}>
            {TEXTS.company.description}
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton}>
              {TEXTS.contact.emergency.callNow}
            </button>
            <button className={styles.secondaryButton}>
              {TEXTS.services.requestQuote}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {TEXTS.services.title}
          </h2>
          <p className={styles.sectionSubtitle}>
            {TEXTS.services.subtitle}
          </p>
          
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Servicios Funerarios</h3>
              <p>Atención profesional y digna en los momentos más difíciles</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Previsión Funeraria</h3>
              <p>Planifica y protege a tu familia con nuestros planes</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Emergencias 24/7</h3>
              <p>Disponibles las 24 horas, los 365 días del año</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {TEXTS.contact.title}
          </h2>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <strong>Teléfono:</strong> {TEXTS.company.phone}
            </div>
            <div className={styles.contactItem}>
              <strong>Email:</strong> {TEXTS.company.email}
            </div>
            <div className={styles.contactItem}>
              <strong>Ubicación:</strong> {TEXTS.company.address}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};