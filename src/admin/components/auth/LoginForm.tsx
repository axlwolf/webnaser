import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const { login } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email', { required: 'Email is required' })} type='email' />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: 'Password is required' })} type='password' />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
