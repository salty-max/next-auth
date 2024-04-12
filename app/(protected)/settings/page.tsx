'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { LoaderCircle, Settings } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { settings } from '@/actions/settings';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useActiveUser } from '@/hooks/use-active-user';
import { SettingsSchema } from '@/schemas';

export default function SettingsPage() {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');
  const [isPending, startTransition] = React.useTransition();
  const user = useActiveUser();
  const session = useSession();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role ?? undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            setSuccess(data?.success);
          }

          session.update();
        })
        .catch(() => {
          setError('Something went wrong.');
        });
    });
  };

  return (
    <Card className='w-2/3 shadow-md'>
      <CardHeader>
        <p className='flex flex-row justify-center items-center text-2xl font-semibold'>
          <Settings className='mr-2 text-2xl' />
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                name='name'
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type='email' {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-2 gap-2'>
                    <FormField
                      name='password'
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name='newPassword'
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              <FormField
                name='role'
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <FormField
                  name='isTwoFactorEnabled'
                  control={control}
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-md border p-3 shadow-sm'>
                      <div className='space-y-0.5'>
                        <FormLabel>Two-factor authentication</FormLabel>
                        <FormDescription>
                          Enable or disable two-factor authentication for your
                          account.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className='flex justify-end'>
              <Button type='submit' disabled={isPending}>
                {isPending && (
                  <LoaderCircle className='mr-2 w-4 h-4 animate-spin' />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
