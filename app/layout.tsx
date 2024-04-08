import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next auth',
  description: 'A simple authentication service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle className='fixed top-8 right-8' />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
