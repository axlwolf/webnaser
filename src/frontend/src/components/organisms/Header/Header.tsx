import React, { useState, useEffect } from 'react';
import { Logo } from '../../atoms/Logo/Logo';
import { Navigation } from '../../molecules/Navigation/Navigation';
import { Button } from '../../atoms/Button/Button';
import { TEXTS } from '../../../constants/texts';
import styles from './Header.module.css';

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'sticky';
  className?: string;
  onNavigate?: (href: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  className = '',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (variant === 'sticky' || variant === 'transparent') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  const handleNavigate = (href: string) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerClasses = [
    styles.header,
    styles[variant],
    isScrolled && styles.scrolled,
    isMobileMenuOpen && styles.mobileMenuOpen,
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.contactInfo}>
            <a href={`tel:${TEXTS.company.phone}`} className={styles.phoneLink}>
              📞 {TEXTS.company.phone}
            </a>
            <a href={`mailto:${TEXTS.company.email}`} className={styles.emailLink}>
              ✉️ {TEXTS.company.email}
            </a>
          </div>
          <div className={styles.quickLinks}>
            <Button
              variant="text"
              size="sm"
              onClick={() => handleNavigate('/emergencia')}
              className={styles.emergencyLink}
            >
              🚨 {TEXTS.navigation.emergency}
            </Button>
          </div>
        </div>

        <div className={styles.mainHeader}>
          <div className={styles.logoContainer}>
            <Logo variant="full" size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <Navigation
              variant="horizontal"
              showCTA={true}
              onItemClick={handleNavigate}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? TEXTS.navigation.closeMenu : TEXTS.navigation.menu}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={styles.mobileNav}>
          <Navigation
            variant="vertical"
            showCTA={true}
            onItemClick={handleNavigate}
          />
        </div>
      </div>
    </header>
  );
};