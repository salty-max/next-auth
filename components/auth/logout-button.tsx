'use client';

import { LogOut } from 'lucide-react';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  children: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const handleClick = () => {
    logout();
  };

  return (
    <span className='cursor-pointer' onClick={handleClick}>
      {children}
    </span>
  );
}
