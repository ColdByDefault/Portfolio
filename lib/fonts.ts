// lib/fonts.ts
import { Orbitron } from 'next/font/google'

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
})
