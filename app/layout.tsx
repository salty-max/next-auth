import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next auth',
  description: 'A simple authentication service',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en' suppressHydrationWarning>
        <body className={nunito.className} suppressHydrationWarning>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
