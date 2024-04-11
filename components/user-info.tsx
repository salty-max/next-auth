import { Server, TabletSmartphone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExtendedUser } from '@/next-auth';

const formattedUserInfo = (user: ExtendedUser) => [
  { key: 'id', label: 'Id', value: user.id },
  { key: 'name', label: 'Name', value: user.name },
  { key: 'email', label: 'Email', value: user.email },
  { key: 'role', label: 'Role', value: user.role },
  {
    key: 'isTwoFactorEnabled',
    label: '2FA Enabled',
    value: user.isTwoFactorEnabled ? 'ON' : 'OFF',
  },
];

interface UserInfoProps {
  user?: ExtendedUser;
  isClient?: boolean;
}

export function UserInfo({ user, isClient }: UserInfoProps) {
  return (
    <Card className='w-2/3 shadow-md'>
      <CardHeader>
        <p className='flex flex-row justify-center items-center text-2xl font-semibold'>
          {isClient ? (
            <TabletSmartphone className='mr-2 text-2xl' />
          ) : (
            <Server className='mr-2 text-2xl' />
          )}
          {`User Info (${isClient ? 'Client' : 'Server'})`}
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {user && (
          <>
            {formattedUserInfo(user).map(({ key, label, value }) => (
              <div
                key={label}
                className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'
              >
                <p className='text-sm font-medium'>{label}</p>
                {key === 'isTwoFactorEnabled' ? (
                  <Badge
                    variant={
                      user.isTwoFactorEnabled ? 'success' : 'destructive'
                    }
                  >
                    {value}
                  </Badge>
                ) : (
                  <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-slate-800 rounded-md'>
                    {value}
                  </p>
                )}
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
