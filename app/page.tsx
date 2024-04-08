import { Lock } from 'lucide-react';

import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <div className='flex space-y-6 flex-col items-center'>
        <div className='flex items-center gap-4'>
          <Lock size={64} className='drop-shadow-md' />
          <h1 className='text-6xl font-semibold drop-shadow-md'>Auth</h1>
        </div>
        <p className='text-lg'>A simple authentication service</p>
        <LoginButton>
          <Button size='lg'>Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
