import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '../../components/layout/Layout/Layout';
import { Home } from '../../pages/Home/Home';
import { TEXTS } from '../../constants/texts';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>{TEXTS.services.title}</h1>
                <p>Página en construcción...</p>
              </div>
            } />
            <Route path="/nosotros" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>{TEXTS.navigation.about}</h1>
                <p>Página en construcción...</p>
              </div>
            } />
            <Route path="/sucursales" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>{TEXTS.locations.title}</h1>
                <p>Página en construcción...</p>
              </div>
            } />
            <Route path="/cobertura" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>{TEXTS.navigation.coverage}</h1>
                <p>Página en construcción...</p>
              </div>
            } />
            <Route path="/contacto" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>{TEXTS.contact.title}</h1>
                <p>Página en construcción...</p>
              </div>
            } />
            <Route path="/emergencia" element={
              <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fef2f2' }}>
                <h1 style={{ color: '#dc2626' }}>{TEXTS.contact.emergency.title}</h1>
                <p>{TEXTS.contact.emergency.subtitle}</p>
                <div style={{ margin: '2rem 0' }}>
                  <a href={`tel:${TEXTS.company.phone}`} style={{ 
                    display: 'inline-block', 
                    padding: '1rem 2rem', 
                    backgroundColor: '#dc2626', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    marginRight: '1rem'
                  }}>
                    📞 {TEXTS.contact.emergency.callNow}
                  </a>
                  <a href={`https://wa.me/52${TEXTS.company.whatsapp.replace(/\s/g, '')}`} style={{ 
                    display: 'inline-block', 
                    padding: '1rem 2rem', 
                    backgroundColor: '#16a34a', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '8px'
                  }}>
                    💬 {TEXTS.contact.emergency.whatsappNow}
                  </a>
                </div>
              </div>
            } />
            <Route path="*" element={
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>404 - {TEXTS.errors.notFound}</h1>
                <a href="/" style={{ color: '#524030' }}>
                  {TEXTS.common.back} al {TEXTS.common.home}
                </a>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;