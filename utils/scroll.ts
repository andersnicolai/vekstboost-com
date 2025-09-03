import { MouseEvent } from 'react'

export const scrollToContact = () => {
  const contactElement = document.getElementById('kontakt')
  if (contactElement) {
    setTimeout(() => {
      const headerOffset = 100
      const elementPosition = contactElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }, 100)
  } else {
    console.warn('Kontaktskjema element ikke funnet! Sjekk at element med id="kontakt" eksisterer.')
  }
} 