import { Navbar } from './_components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <main className='h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-secondary'>
      <Navbar />
      {children}
    </main>
  );
}
