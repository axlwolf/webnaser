import React from 'react';
import { TEXTS } from '../../../constants/texts';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const logoClasses = [
    styles.logo,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  if (variant === 'icon') {
    return (
      <div className={logoClasses} aria-label={TEXTS.accessibility.logo}>
        <div className={styles.iconSymbol}>N</div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={logoClasses} aria-label={TEXTS.accessibility.logo}>
        <div className={styles.iconSymbol}>N</div>
        <span className={styles.compactText}>Naser</span>
      </div>
    );
  }

  return (
    <div className={logoClasses} aria-label={TEXTS.accessibility.logo}>
      <div className={styles.iconSymbol}>N</div>
      <div className={styles.textContainer}>
        <span className={styles.primaryText}>{TEXTS.company.name}</span>
        <span className={styles.taglineText}>{TEXTS.company.tagline}</span>
      </div>
    </div>
  );
};