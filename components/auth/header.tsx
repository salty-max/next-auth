import { Lock } from 'lucide-react';

interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='flex items-center gap-4'>
        <Lock size={30} className='drop-shadow-md' />
        <h1 className='text-3xl font-semibold'>Auth</h1>
      </div>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}
