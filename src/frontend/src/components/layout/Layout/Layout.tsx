/**
 * Layout Component - Grupo Naser CMS
 * Layout principal que incluye Header y Footer
 */

import React from 'react';
import { HeaderSimple } from '../Header/HeaderSimple';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={`${styles.layout} ${className || ''}`}>
      <HeaderSimple />
      <main className={styles.main} role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;