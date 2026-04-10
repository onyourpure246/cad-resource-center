import { Kanit, Sarabun, Prompt } from 'next/font/google'

export const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-kanit',
  adjustFontFallback: false,
})

export const sarabun = Sarabun({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-sarabun',
  adjustFontFallback: false,
})

export const prompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-prompt',
  adjustFontFallback: false,
})