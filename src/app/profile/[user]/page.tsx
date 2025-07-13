'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Mock data for demonstration
const mockUser = {
  username: 'usuario_ejemplo',
  bio: 'Amante de la fotografía y la naturaleza',
  followers: 150,
  following: 120,
  posts: [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/600/600',
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/600/600?r=2',
      likes: 32,
      comments: 8
    },
    {
      id: 3,
      imageUrl: 'https://picsum.photos/600/600?r=3',
      likes: 67,
      comments: 15
    }
  ]
};

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow mb-8">
            <div className="flex items-start gap-8">
              <div className="relative w-32 h-32">
                <Image
                  src="https://picsum.photos/128/128"
                  alt="Foto de perfil"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {mockUser.username}
                  </h1>
                  <Link
                    href="/profile/edit"
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Editar perfil
                  </Link>
                </div>
                <div className="flex gap-6 mb-4 text-gray-500">
                  <span className="text-sm">
                    <strong>{mockUser.posts.length}</strong> publicaciones
                  </span>
                  <span className="text-sm">
                    <strong>{mockUser.followers}</strong> seguidores
                  </span>
                  <span className="text-sm">
                    <strong>{mockUser.following}</strong> seguidos
                  </span>
                </div>
                <p className="text-gray-600">{mockUser.bio}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockUser.posts.map(post => (
              <div
                key={post.id}
                className="aspect-square relative group cursor-pointer"
              >
                <Image
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center rounded-lg">
                  <div className="hidden group-hover:flex gap-6 text-white">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
