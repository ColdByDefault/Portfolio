
/**
 * Configures and exports the Orbitron font using the Google Fonts integration
 * provided by Next.js. The font is set up with specific subsets, weights, and
 * a CSS variable for custom styling.
 *
 * @ constant
 * @ type {import('next/font/google').GoogleFont}
 * @ property {string[]} subsets - Specifies the character subsets to include. In this case, only 'latin' is included.
 * @ property {string[]} weight - Defines the font weights to load. Includes '400', '500', and '700'.
 * @ property {string} variable - A CSS variable name for referencing the font in styles. Set to '--font-orbitron'.
 */
import { Orbitron } from 'next/font/google'

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
})
