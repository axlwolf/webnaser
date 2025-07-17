import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Placeholder components for routes
const Home = () => <div><h1>Grupo Naser - Home Page</h1></div>
const Services = () => <div><h1>Our Services</h1></div>
const Locations = () => <div><h1>Our Locations</h1></div>
const Contact = () => <div><h1>Contact Us</h1></div>
const NotFound = () => <div><h1>404 - Page Not Found</h1></div>

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/locations">Locations</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Grupo Naser. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
