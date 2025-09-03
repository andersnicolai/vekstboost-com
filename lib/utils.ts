import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Locale } from '@/i18n/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedPath(path: string, lang: Locale = 'no'): string {
  if (lang === 'no') {
    return path
  }
  return `/${lang}${path}`
}
