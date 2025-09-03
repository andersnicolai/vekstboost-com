import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Siden ble ikke funnet
        </h2>
        <p className="text-gray-600 mb-8">
          Beklager, vi kunne ikke finne siden du leter etter.
        </p>
        <Link
          href="/no"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Tilbake til forsiden
        </Link>
      </div>
    </div>
  )
} 