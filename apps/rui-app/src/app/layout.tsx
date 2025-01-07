import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import '@ui/styles/globals.css'
import { OpenApiParser } from '../core/generator/OpenApiParser'
import { TestDocument1 } from '../samples/test'
import NavigationDrawer from '../components/rui/NavigationDrawer'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const spec = new OpenApiParser(TestDocument1).parse()
  spec.baseUrl = 'http://localhost:5093'
  return (
    <html lang="en">
      <body className={`m-2 ${roboto.className} ${robotoMono.variable} antialiased`}>
        <NavigationDrawer spec={spec}>
          {children}
          </NavigationDrawer>
      </body>
    </html>
  )
}
