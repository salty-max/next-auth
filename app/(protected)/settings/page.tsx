import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      <h1>Settings</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </div>
  );
}
