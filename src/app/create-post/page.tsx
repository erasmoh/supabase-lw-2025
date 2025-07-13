"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CreatePost() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    content: "",
    image: null as File | null,
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [errors, setErrors] = useState({
    content: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Validación básica
      const newErrors = {
        content: "",
        image: "",
      };

      if (!formData.content) {
        newErrors.content = "El contenido es requerido";
      }

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
        return;
      }

      let imageUrl = null;

      // Subir imagen si existe
      if (formData.image) {
        try {
          // Generar nombre único para el archivo y escapar caracteres especiales
          const safeFileName = formData.image.name.replace(
            /[^a-zA-Z0-9.]/g,
            "_"
          );
          const fileName = `${safeFileName}_${new Date().getTime()}`;

          // Subir la imagen
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("posts")
              .upload(`public/${fileName}`, formData.image, {
                cacheControl: "3600",
                upsert: false,
              });

          if (uploadError) {
            throw new Error("Error al subir la imagen: " + uploadError.message);
          }

          // Esperar a que la imagen esté disponible
          const {
            data: { publicUrl },
          } = supabase.storage.from("posts").getPublicUrl(`public/${fileName}`);

          // Verificar que la imagen sea accesible
          const imageResponse = await fetch(publicUrl);
          if (!imageResponse.ok) {
            throw new Error("Error al verificar la imagen");
          }

          imageUrl = publicUrl;
        } catch (error) {
          console.error("Error al procesar la imagen:", error);
          throw new Error(
            "Error al procesar la imagen. Por favor, intenta de nuevo."
          );
        }
      }

      // Solo crear el post si la imagen se subió correctamente (o si no hay imagen)
      const { error: insertError } = await supabase.from("posts").insert({
        caption: formData.content,
        imageurl: imageUrl,
        username: user?.email,
        avatarurl: "https://picsum.photos/150/150",
      });

      if (insertError) {
        throw new Error("Error al crear el post");
      }

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      setErrors((prev) => ({
        ...prev,
        image:
          error instanceof Error ? error.message : "Error al crear el post",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  return (
    <>
      <div className="pt-16 min-h-screen bg-gray-50">
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Crear nueva publicación
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                {errors.image && (
                  <p className="text-sm text-red-600">{errors.image}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contenido
                </label>
                <textarea
                  name="content"
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  className="block w-full text-gray-600 p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content}</p>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Publicando..." : "Publicar"}
                </button>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => router.push("/")}
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
