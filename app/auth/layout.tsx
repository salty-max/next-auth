export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className='h-screen flex items-center justify-center'
      suppressHydrationWarning
    >
      {children}
    </main>
  );
}
