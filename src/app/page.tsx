'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';

// Mock data para demostración
const mockPosts = [
  {
    id: 1,
    user: {
      username: 'usuario1',
      avatarUrl: 'https://picsum.photos/150/150'
    },
    imageUrl: 'https://picsum.photos/600/600',
    caption: '¡Disfrutando de un hermoso día! 🌞',
    likes: 42,
    comments: 5,
    createdAt: '2025-07-12T12:00:00Z'
  },
  {
    id: 2,
    user: {
      username: 'fotografia_pro',
      avatarUrl: 'https://picsum.photos/150/150'
    },
    imageUrl: 'https://picsum.photos/600/600',
    caption: 'La belleza está en los detalles 📸',
    likes: 128,
    comments: 12,
    createdAt: '2025-07-12T10:30:00Z'
  },
  {
    id: 3,
    user: {
      username: 'viajero_nomada',
      avatarUrl: 'https://picsum.photos/150/150'
    },
    imageUrl: 'https://picsum.photos/600/600',
    caption: 'Explorando nuevos horizontes ✈️',
    likes: 89,
    comments: 8,
    createdAt: '2025-07-12T09:15:00Z'
  }
];

export default function Home() {
  // Simular verificación de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simular carga de estado de autenticación
  useEffect(() => {
    // Aquí iría la lógica real de verificación de autenticación
    const checkAuth = () => {
      // Por ahora, usaremos un valor hardcodeado
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen bg-gray-50">
          <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Botón para crear nuevo post */}
            <div className="mb-8">
              <Link
                href="/create-post"
                className="block w-full bg-blue-500 text-white text-center px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Crear nueva publicación
              </Link>
            </div>

            {/* Lista de posts */}
            <div className="space-y-6">
              {mockPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }
  // Si no está autenticado, mostrar la página de bienvenida
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Bienvenido a lw-gram
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tu espacio para compartir momentos especiales de manera simple y elegante.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Crear cuenta
              </Link>
              <Link
                href="/login"
                className="bg-white text-gray-900 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Comparte</h3>
              <p className="text-gray-600">
                Comparte tus momentos más especiales con una comunidad que aprecia la simplicidad.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Conecta</h3>
              <p className="text-gray-600">
                Conéctate con personas que comparten tus intereses y pasiones.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Descubre</h3>
              <p className="text-gray-600">
                Descubre historias inspiradoras y contenido único en un ambiente minimalista.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
