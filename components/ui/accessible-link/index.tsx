import React from 'react'
import Link from 'next/link'

interface AccessibleLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  'aria-label'?: string
}

export function AccessibleLink({ 
  href, 
  children, 
  className = '',
  target,
  rel,
  'aria-label': ariaLabel,
  ...props 
}: AccessibleLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  
  if (isExternal) {
    return (
      <a
        href={href}
        className={`text-blue-600 hover:text-blue-800 underline ${className}`}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link 
      href={href} 
      className={`text-blue-600 hover:text-blue-800 underline ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Link>
  )
} 