import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../Footer/Footer';
import { Preloader } from '../../atoms/Preloader/Preloader';
import { useGlobalStore } from '../../../store/globalStore';
import { TEXTS } from '../../../constants/texts';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}) => {
  const { isLoading } = useGlobalStore();

  return (
    <>
      {isLoading && <Preloader />}
      
      <div className={`${styles.layout} ${className}`}>
        <a href="#main-content" className="skip-link">
          {TEXTS.navigation.skipToContent}
        </a>
        
        {showHeader && <Header />}
        
        <main 
          id="main-content" 
          className={styles.main}
          role="main"
        >
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
};