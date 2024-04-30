'use client'
import { motion } from 'framer-motion'

export const PageTransition = (props: { children: React.ReactNode }) => {
  const { children } = props
  return (
    <motion.div
      className="w-full grow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
