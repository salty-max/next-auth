'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserButton } from '@/components/auth/user-button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';

const tabs = [
  { name: 'Server', href: '/server' },
  { name: 'Client', href: '/client' },
  { name: 'Admin', href: '/admin' },
  { name: 'Settings', href: '/settings' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className='bg-background flex justify-between items-center p-4 rounded-xl w-2/3 shadow-sm'>
      <div className='flex gap-x-2'>
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            asChild
            variant={pathname === tab.href ? 'default' : 'outline'}
          >
            <Link href={tab.href}>{tab.name}</Link>
          </Button>
        ))}
      </div>
      <div className='flex gap-x-2 items-center'>
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
