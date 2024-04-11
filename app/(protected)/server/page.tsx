import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth/current-user';

export default async function ServerPage() {
  const user = await currentUser();
  return <UserInfo user={user} />;
}
