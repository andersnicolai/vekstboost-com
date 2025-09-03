'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Noe gikk galt!
        </h2>
        <p className="text-gray-600 mb-6">
          Vi beklager, men det oppstod en feil. Prøv å laste siden på nytt.
        </p>
        <button
          onClick={reset}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Prøv igjen
        </button>
      </div>
    </div>
  )
} 