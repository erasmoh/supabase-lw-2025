import Link from 'next/link';

export default function HomepageContent() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Bienvenido a lw-gram
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu espacio para compartir momentos especiales de manera simple y
            elegante.
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
              Comparte tus momentos más especiales con una comunidad que aprecia la
              simplicidad.
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
  );
};
