'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';

export async function login(values: z.infer<typeof LoginSchema>) {
  const validated = LoginSchema.safeParse(values);

  if (!validated.success) {
    return { error: 'Invalid credentials.' };
  }

  const { email, password } = validated.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials.',
          };
        default:
          return {
            error: 'Something went wrong.',
          };
      }
    }

    throw error;
  }
}
