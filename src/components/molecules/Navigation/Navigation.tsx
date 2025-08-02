import React, { useState } from 'react';
import { TEXTS } from '../../../constants/texts';
import { Button } from '../../atoms/Button/Button';
import styles from './Navigation.module.css';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
}

interface NavigationProps {
  variant?: 'horizontal' | 'vertical';
  showCTA?: boolean;
  className?: string;
  onItemClick?: (href: string) => void;
}

const navigationItems: NavigationItem[] = [
  { label: TEXTS.navigation.home, href: '/' },
  { label: TEXTS.navigation.services, href: '/servicios' },
  { label: TEXTS.navigation.about, href: '/nosotros' },
  { label: TEXTS.navigation.locations, href: '/sucursales' },
  { label: TEXTS.navigation.coverage, href: '/cobertura' },
  { label: TEXTS.navigation.contact, href: '/contacto' },
];

export const Navigation: React.FC<NavigationProps> = ({
  variant = 'horizontal',
  showCTA = true,
  className = '',
  onItemClick,
}) => {
  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveItem(href);
    onItemClick?.(href);
  };

  const navClasses = [
    styles.navigation,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClasses} role="navigation" aria-label={TEXTS.accessibility.menu}>
      <ul className={styles.navList}>
        {navigationItems.map((item) => (
          <li key={item.href} className={styles.navItem}>
            <a
              href={item.href}
              className={`${styles.navLink} ${activeItem === item.href ? styles.active : ''}`}
              onClick={(e) => handleItemClick(item.href, e)}
              aria-current={activeItem === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      
      {showCTA && (
        <div className={styles.ctaContainer}>
          <Button
            variant="filled"
            size="md"
            className={styles.emergencyButton}
            onClick={() => onItemClick?.('/emergencia')}
          >
            {TEXTS.navigation.emergency}
          </Button>
        </div>
      )}
    </nav>
  );
};