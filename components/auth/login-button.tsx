'use client';

import { useRouter } from 'next/navigation';

import { Routes } from '@/routes';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(Routes.auth.login);
  };

  if (mode === 'modal') {
    return <span>TODO: Implement modal mode</span>;
  }

  return (
    <span className='cursor-pointer' onClick={handleClick}>
      {children}
    </span>
  );
}
