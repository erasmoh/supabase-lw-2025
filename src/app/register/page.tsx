'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/forms/Input';
import Navbar from '@/components/Navbar';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Aquí iría la lógica de registro
    console.log('Registro exitoso', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Crear cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nombre de usuario"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
              <Input
                label="Correo electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Registrarse
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Inicia sesión
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
