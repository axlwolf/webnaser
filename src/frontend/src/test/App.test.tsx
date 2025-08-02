import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

// App already includes Router, so we just render it directly

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    // This test will pass if the component renders without throwing an error
    expect(document.body).toBeTruthy()
  })

  it('contains main content', () => {
    render(<App />)
    // Look for the main element
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeTruthy()
  })

  it('displays home page content by default', () => {
    render(<App />)
    // Check if home page content is displayed (using company name instead)
    expect(screen.getByText('GRUPO NASER')).toBeTruthy()
  })

  it('contains navigation links', () => {
    render(<App />)
    // Check if navigation links are present (using getAllByText for duplicates in header/footer)
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Servicios').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sucursales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0)
  })
})