'use client';

import { ShieldBan } from 'lucide-react';

import { Card, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-active-role';

export default function AdminPage() {
  const role = useCurrentRole();
  return (
    <Card className='w-2/3 shadow-md'>
      <CardHeader>
        <p className='flex flex-row justify-center items-center text-2xl font-semibold'>
          <ShieldBan className='mr-2 text-2xl' />
          Admin
        </p>
      </CardHeader>
    </Card>
  );
}
