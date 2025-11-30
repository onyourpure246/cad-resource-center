import { Kanit, Sarabun } from 'next/font/google'

export const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-kanit',
})

export const sarabun = Sarabun({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-sarabun',
})