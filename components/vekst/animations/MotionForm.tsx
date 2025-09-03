'use client'

import { motion } from 'framer-motion'
import { HTMLMotionProps } from 'framer-motion'

export function MotionForm(props: HTMLMotionProps<'form'>) {
  return <motion.form {...props} />
} 