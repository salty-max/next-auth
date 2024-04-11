'use client';

import { Settings } from 'lucide-react';

import { Card, CardHeader } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <Card className='w-2/3 shadow-md'>
      <CardHeader>
        <p className='flex flex-row justify-center items-center text-2xl font-semibold'>
          <Settings className='mr-2 text-2xl' />
          Settings
        </p>
      </CardHeader>
    </Card>
  );
}
