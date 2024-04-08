import type { UserRole } from '@prisma/client';
import type { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module '@auth/core' {
  interface Session {
    user: ExtendedUser;
  }
}
