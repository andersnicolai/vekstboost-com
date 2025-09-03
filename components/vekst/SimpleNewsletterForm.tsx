'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SimpleNewsletterFormProps {
  title?: string
  description?: string
  buttonText?: string
  source?: string
  compact?: boolean
  showInterests?: boolean
  className?: string
}

export default function SimpleNewsletterForm({
  title = "Subscribe to our newsletter",
  description = "Get the latest updates directly to your inbox.",
  buttonText = "Subscribe",
  source = "default",
  compact = false,
  showInterests = false,
  className
}: SimpleNewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('E-post må fylles ut')
      return
    }

    setStatus('loading')
    
    try {
      // Her ville vi normalt kalle en API for å lagre nyhetsbrev-påmeldingen
      // Simulerer API-kall med timeout
      setTimeout(() => {
        setStatus('success')
        setMessage('Takk for din påmelding! Vi har sendt deg en e-post med mer informasjon. 🎉')
        setEmail('')
      }, 1000)
    } catch (error) {
      setStatus('error')
      setMessage('Det oppstod en feil. Vennligst prøv igjen senere.')
    }
  }

  return (
    <div 
      className={cn(
        "rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl", 
        compact ? "p-6" : "p-8",
        className || "bg-white"
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-left flex items-start gap-3">
          <div className="flex-1">
            <h3 className={cn("font-bold", compact ? "text-xl" : "text-2xl")}>{title}</h3>
            <p className={cn("mt-2", compact ? "text-sm" : "text-base")}>{description}</p>
          </div>
          <div className="hidden md:flex h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 items-center justify-center flex-shrink-0">
            <span className="text-xl">🎉</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-indigo-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Din e-post"
            className="w-full pl-10 pr-24 py-3 rounded-lg border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-500"
            disabled={status === 'loading' || status === 'success'}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={cn(
                "flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all",
                status === 'loading' ? "bg-gray-300" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              )}
            >
              {status === 'loading' ? (
                <span className="animate-spin inline-block">
                  <Send className="h-4 w-4 text-gray-500" />
                </span>
              ) : (
                <>
                  {buttonText}
                  <span className="inline-block ml-1">🎉</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {status !== 'idle' && (
          <div
            className={cn(
              "p-3 rounded-lg text-sm flex items-center",
              status === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}
          >
            {status === 'success' ? (
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}
        
        <div className="text-xs text-gray-500 flex items-center">
          <Info className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>Vi verdsetter personvern og deler aldri din e-post med tredjeparter.</span>
        </div>
      </form>
    </div>
  )
} 