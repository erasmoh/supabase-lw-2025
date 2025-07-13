import { signup } from '@/app/login/actions';
import Link from 'next/link';
import Input from '@/components/forms/Input';

export default function Register() {


  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Crear cuenta
          </h1>
          <form action={signup} className="space-y-6">
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
            <Input
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
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
  );
}
