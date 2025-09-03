import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../button'

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  ariaLabel?: string
}

export function AccessibleButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ariaLabel,
  ...props
}: AccessibleButtonProps) {
  // Ensure there's always an accessible name
  const hasAccessibleName = 
    ariaLabel || 
    (typeof children === 'string' && children.trim() !== '') ||
    (React.isValidElement(children) && children.props?.children && 
     typeof children.props.children === 'string' && 
     children.props.children.trim() !== '')

  // If no accessible name is provided, add a warning in development
  if (process.env.NODE_ENV === 'development' && !hasAccessibleName) {
    console.warn(
      'AccessibleButton: Button does not have an accessible name. ' +
      'Please provide an ariaLabel prop or ensure children contains text content.'
    )
  }

  return (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      asChild={asChild}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </Button>
  )
} 