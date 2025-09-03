'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/i18n/config'
import type { Dictionary } from '@/types/dictionary'

interface Props {
  dict: Dictionary
  lang: Locale
}

export default function LanguageSwitcher({ dict, lang }: Props) {
  const pathname = usePathname()
  
  const getLocalizedPath = (newLang: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLang
    return segments.join('/')
  }

  const languages = [
    { code: 'no' as Locale, name: 'NO', flag: '🇳🇴' },
    { code: 'en' as Locale, name: 'EN', flag: '🇬🇧' },
    { code: 'dk' as Locale, name: 'DK', flag: '🇩🇰' },
    { code: 'sv' as Locale, name: 'SV', flag: '🇸🇪' }
  ]

  return (
    <div className="flex items-center space-x-2">
      {languages.map((language) => (
        <Link
          key={language.code}
          href={getLocalizedPath(language.code)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            lang === language.code
              ? 'bg-white/20 text-white'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="mr-1">{language.flag}</span>
          {language.name}
        </Link>
      ))}
    </div>
  )
} 