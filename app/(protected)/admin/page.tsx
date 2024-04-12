'use client';

import { UserRole } from '@prisma/client';
import { ShieldBan } from 'lucide-react';
import { toast } from 'sonner';

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AdminPage() {
  const onApiRouteClick = async function () {
    const response = await fetch('/api/admin');
    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    const data = await response.json();
    toast.success(data.message);
  };

  const onServerActionClick = async function () {
    const response = await admin();

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.message);
  };

  return (
    <Card className='w-2/3 shadow-md'>
      <CardHeader>
        <p className='flex flex-row justify-center items-center text-2xl font-semibold'>
          <ShieldBan className='mr-2 text-2xl' />
          Admin
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='You are an admin!' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-md border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
