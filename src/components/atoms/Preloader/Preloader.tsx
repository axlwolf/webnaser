import React from 'react';
import { TEXTS } from '../../../constants/texts';
import styles from './Preloader.module.css';

interface PreloaderProps {
  message?: string;
  className?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  message = TEXTS.loading.general,
  className = '',
}) => {
  return (
    <div className={`${styles.preloader} ${className}`} role="status" aria-live="polite">
      <div className={styles.spinner}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <span className={styles.message}>{message}</span>
      <span className="sr-only">Cargando contenido...</span>
    </div>
  );
};