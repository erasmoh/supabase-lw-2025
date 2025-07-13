'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Input from '@/components/forms/Input';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null as File | null
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    const newErrors = {
      title: '',
      content: '',
      image: ''
    };

    if (!formData.title) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.content) {
      newErrors.content = 'El contenido es requerido';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // Aquí iría la lógica de creación de post
    console.log('Post creado', formData);
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
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Crear nueva publicación
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Título"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contenido
                </label>
                <textarea
                  name="content"
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.image && (
                  <p className="text-sm text-red-600">{errors.image}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Publicar
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
