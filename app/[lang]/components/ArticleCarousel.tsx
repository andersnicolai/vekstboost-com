'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AccessibleHeading } from '@/components/ui/accessible-heading'
import { AccessibleLink } from '@/components/ui/accessible-link'
import { AccessibleButton } from '@/components/ui/accessible-button'

interface Article {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  date: string
  readTime: string
  url: string
}

interface ArticleCarouselProps {
  articles: Article[]
  dict: any
  lang: string
}

export default function ArticleCarousel({ articles, dict, lang }: ArticleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Håndter responsivitet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Oppdater synlige artikler basert på skjermstørrelse og currentIndex
  useEffect(() => {
    const itemsPerView = isMobile ? 1 : 3
    const startIndex = currentIndex
    const endIndex = Math.min(startIndex + itemsPerView, articles.length)
    
    setVisibleArticles(articles.slice(startIndex, endIndex))
  }, [currentIndex, articles, isMobile])

  const nextSlide = () => {
    const maxIndex = isMobile 
      ? articles.length - 1 
      : articles.length - 3
    
    setCurrentIndex(prev => 
      prev >= maxIndex ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    const maxIndex = articles.length - 1
    
    setCurrentIndex(prev => 
      prev <= 0 ? maxIndex : prev - 1
    )
  }

  // Hvis vi ikke har artikler, vis en placeholder
  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <AccessibleHeading level={2} className="text-2xl font-bold mb-4 text-gray-800">{dict?.articles?.title || 'Artikler'}</AccessibleHeading>
        <p className="text-gray-500">{dict?.articles?.empty || 'Ingen artikler tilgjengelig'}</p>
      </div>
    )
  }

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <AccessibleHeading level={2} className="text-3xl font-bold text-gray-800">{dict?.articles?.title || 'Siste artikler'}</AccessibleHeading>
          <div className="flex gap-2">
            <AccessibleButton 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              aria-label="Forrige artikler"
              className="border-gray-200 hover:bg-gray-50 text-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </AccessibleButton>
            <AccessibleButton 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              aria-label="Neste artikler"
              className="border-gray-200 hover:bg-gray-50 text-gray-600"
            >
              <ChevronRight className="h-4 w-4" />
            </AccessibleButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 bg-white">
              <div className="relative h-48">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800 hover:bg-blue-200">{article.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-gray-800">{article.title}</CardTitle>
                <CardDescription>
                  <span className="text-xs text-gray-500">{article.date} • {article.readTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{article.description}</p>
              </CardContent>
              <CardFooter>
                <AccessibleButton variant="link" className="p-0 text-primary hover:text-primary/90">
                  <AccessibleLink href={article.url}>{dict?.articles?.readMore || 'Les mer'}</AccessibleLink>
                </AccessibleButton>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 gap-1">
          {Array.from({ length: Math.ceil(articles.length / (isMobile ? 1 : 3)) }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full ${
                Math.floor(currentIndex / (isMobile ? 1 : 3)) === i 
                  ? 'bg-primary' 
                  : 'bg-gray-200'
              }`}
              onClick={() => setCurrentIndex(i * (isMobile ? 1 : 3))}
              aria-label={`Gå til slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 