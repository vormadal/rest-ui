import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import '@ui/styles/globals.css';
import { ApiBuilder } from '../core/generator/ApiBuilder';
import { TestDocument1 } from '../samples/test';
import NavigationDrawer from '../components/rui/NavigationDrawer';
import { RuiApp } from '../core/app/RuiApp';
import { PageBuilder } from '../core/generator/PageBuilder';
import { ApiBuilderContext } from '../core/generator/context/ApiBuilderContext';
import { nextAppOptions } from '../lib/AppOptions';
import defaultAppProvider from '../lib/AppProvider';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`m-2 ${roboto.className} ${robotoMono.variable} antialiased`}
      >
        <NavigationDrawer spec={defaultAppProvider.app.spec}>
          {children}
        </NavigationDrawer>
      </body>
    </html>
  );
}
