'use client'

import { motion } from 'framer-motion'
import { HTMLMotionProps } from 'framer-motion'

export function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props} />
} 