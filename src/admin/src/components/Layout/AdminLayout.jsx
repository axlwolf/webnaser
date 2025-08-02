// AdminLayout.jsx - Main layout component for Admin Dashboard
import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './AdminLayout.module.scss'

/**
 * AdminLayout - Main layout wrapper for admin dashboard
 * Provides consistent structure with header, sidebar, and main content area
 * 
 * @component
 * @example
 * return (
 *   <AdminLayout>
 *     <Routes>
 *       <Route path="/dashboard" element={<Dashboard />} />
 *     </Routes>
 *   </AdminLayout>
 * )
 */
const AdminLayout = memo(() => {
  return (
    <div className={styles.adminLayout}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className={styles.skipLink}
        aria-label="Saltar al contenido principal"
      >
        Saltar al contenido principal
      </a>
      
      {/* Header */}
      <Header />
      
      <div className={styles.container}>
        {/* Sidebar Navigation */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main 
          id="main-content"
          className={styles.mainContent}
          role="main"
          aria-label="Contenido principal del panel de administración"
        >
          <div className={styles.contentWrapper}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
})

AdminLayout.displayName = 'AdminLayout'

export default AdminLayout