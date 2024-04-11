'use client';

import { UserInfo } from '@/components/user-info';
import { useActiveUser } from '@/hooks/use-active-user';

export default function ClientPage() {
  const user = useActiveUser();

  return <UserInfo user={user} isClient />;
}
