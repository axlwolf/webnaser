import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'

// Placeholder components for routes
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt with:', { username, password })
    // Authentication logic will be implemented later
  }
  
  return (
    <div className="login-container">
      <h1>Grupo Naser CMS Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const Dashboard = () => <div><h1>Admin Dashboard</h1></div>
const Pages = () => <div><h1>Page Management</h1></div>
const Services = () => <div><h1>Service Management</h1></div>
const Locations = () => <div><h1>Location Management</h1></div>
const Media = () => <div><h1>Media Management</h1></div>
const NotFound = () => <div><h1>404 - Page Not Found</h1></div>

// Protected route component
const ProtectedRoute = ({ children }) => {
  // This is a placeholder for authentication logic
  // In a real implementation, this would check for a valid token
  const isAuthenticated = true // This will be replaced with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  
  return (
    <div className="admin-app">
      {!isLoginPage && (
        <header className="admin-header">
          <div className="logo">Grupo Naser CMS</div>
          <nav className="admin-nav">
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/pages">Pages</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/locations">Locations</a></li>
              <li><a href="/media">Media</a></li>
            </ul>
          </nav>
          <div className="user-menu">
            <span>Admin User</span>
            <button>Logout</button>
          </div>
        </header>
      )}
      
      <main className="admin-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/pages" element={
            <ProtectedRoute>
              <Pages />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />
          <Route path="/locations" element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          } />
          <Route path="/media" element={
            <ProtectedRoute>
              <Media />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {!isLoginPage && (
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} Grupo Naser CMS Admin. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}

export default App