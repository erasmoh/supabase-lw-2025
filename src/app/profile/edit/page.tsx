'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Input from '@/components/forms/Input';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: 'usuario_ejemplo',
    email: 'usuario@ejemplo.com',
    bio: 'Amante de la fotografía y la naturaleza',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    const newErrors = {
      username: '',
      email: '',
      bio: '',
      currentPassword: '',
      newPassword: '',
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

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'La contraseña actual es requerida';
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Aquí iría la lógica de actualización del perfil
    console.log('Perfil actualizado', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí iría la lógica para manejar la imagen
      console.log('Nueva imagen de perfil seleccionada', file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Editar perfil
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32">
                  <Image
                    src="https://picsum.photos/128/128"
                    alt="Foto de perfil"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <label className="inline-block px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
                    Cambiar foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Biografía
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio}</p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Cambiar contraseña
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Contraseña actual"
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    error={errors.currentPassword}
                  />
                  <Input
                    label="Nueva contraseña"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword}
                  />
                  <Input
                    label="Confirmar nueva contraseña"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => window.history.back()}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
