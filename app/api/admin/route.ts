import { NextResponse } from 'next/server';

import { currentRole } from '@/lib/auth';

export async function GET() {
  const role = await currentRole();

  if (role === 'ADMIN') {
    return NextResponse.json(
      {
        message: 'Hello, admin! I am a API route.',
      },
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 403 });
}
