'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/forms/Input';
import Navbar from '@/components/Navbar';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Aquí iría la lógica de inicio de sesión
    console.log('Inicio de sesión exitoso', formData);
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
              Iniciar sesión
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Iniciar sesión
              </button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/register" className="text-blue-500 hover:text-blue-600">
                  Regístrate
                </Link>
              </p>
              <Link
                href="/forgot-password"
                className="block text-sm text-blue-500 hover:text-blue-600"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
