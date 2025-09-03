import React from 'react'
import { cn } from '@/lib/utils'

interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  id?: string
}

export function AccessibleHeading({
  level,
  children,
  className,
  id,
  ...props
}: AccessibleHeadingProps) {
  // Create the appropriate heading element
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  // Generate an ID if not provided
  const headingId = id || (typeof children === 'string' 
    ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    : undefined)
  
  return (
    <HeadingTag
      id={headingId}
      className={cn(className)}
      {...props}
    >
      {children}
    </HeadingTag>
  )
}

// Convenience components for each heading level
export function H1(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={1} {...props} />
}

export function H2(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={2} {...props} />
}

export function H3(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={3} {...props} />
}

export function H4(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={4} {...props} />
}

export function H5(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={5} {...props} />
}

export function H6(props: Omit<AccessibleHeadingProps, 'level'>) {
  return <AccessibleHeading level={6} {...props} />
} 