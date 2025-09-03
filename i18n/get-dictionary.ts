import type { Dictionary } from '@/types/dictionary'
import no from './no'
import en from './en'
import sv from './sv'
import dk from './dk'

const dictionaries = {
  no,
  en,
  sv,
  dk,
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // @ts-ignore
  return dictionaries[locale] ?? dictionaries.no
} 