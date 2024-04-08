'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '../ui/button';

export function Socials() {
  return (
    <div className='flex items-center w-full gap-x-6'>
      <Button size='lg' variant='outline' className='w-full'>
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button size='lg' variant='outline' className='w-full'>
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
}
