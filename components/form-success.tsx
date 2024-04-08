import { CircleCheck } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className='flex items-center gap-x-2 text-sm p-3 rounded-md bg-emerald-500/15 text-emerald-500'>
      <CircleCheck className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
}
