// 'use client';

import Link from 'next/link';
import Input from '@/components/forms/Input';
import { login } from './actions'

export default function Login() {

  return (
    <div className="pt-16 min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Iniciar sesión
          </h1>
          <form action={login} className="space-y-6">
            <Input
              label="Correo electrónico"
              type="email"
              name="email"
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
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
  );
}
