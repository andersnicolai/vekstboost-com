import { SupportedLanguage } from '@/types'
import { AccessibleHeading } from '@/components/ui/accessible-heading'

interface MarketingEducationProps {
  dict: any
  lang: SupportedLanguage
}

export default function MarketingEducation({ dict, lang }: MarketingEducationProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AccessibleHeading level={2} className="text-3xl font-bold text-center mb-8">
          Marketing Education
        </AccessibleHeading>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Learn about modern marketing strategies and best practices.
        </p>
      </div>
    </section>
  )
} 