'use client';

import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { Routes } from '@/routes';

export default function Home() {
  const router = useRouter();
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <div className='flex space-y-6 flex-col items-center'>
        <div className='flex items-center gap-4'>
          <Lock size={64} className='drop-shadow-md' />
          <h1 className='text-6xl font-semibold drop-shadow-md'>Auth</h1>
        </div>
        <p className='text-lg'>A simple authentication service</p>
        <LoginButton>
          <Button size='lg' onClick={() => router.push(Routes.auth.login)}>
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
