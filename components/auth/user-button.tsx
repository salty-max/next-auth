'use client';

import { DoorOpen, LogOut, User } from 'lucide-react';

import { LogoutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useActiveUser } from '@/hooks/use-active-user';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../ui/button';

export function UserButton() {
  const user = useActiveUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className='p-0 rounded-full'>
          <Avatar>
            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? ''} />
            <AvatarFallback>
              <User className='h-4 w-4' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem>
            <DoorOpen className='mr-2 h-4 w-4' />
            Sign out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
