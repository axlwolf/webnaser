import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from '../LoginForm'

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}))

describe('LoginForm', () => {
  test('renders login form', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('handles login submission', async () => {
    const mockLogin = jest.fn()
    jest.mock('../../hooks/useAuth', () => ({
      useAuth: () => ({
        login: mockLogin,
      }),
    }))

    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
  })
})