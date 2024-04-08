'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validated = RegisterSchema.safeParse(values);

  if (!validated.success) {
    return { error: 'Invalid credentials.' };
  }

  const { name, email, password } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already taken.' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: 'User created!' };
}
