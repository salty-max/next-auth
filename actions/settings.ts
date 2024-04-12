'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const validated = SettingsSchema.safeParse(values);
  if (!validated.success) {
    return { error: 'Invalid settings.' };
  }

  const { data } = validated;

  const user = await currentUser();
  if (!user) {
    return { error: 'User not found.' };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: 'User not found.' };
  }

  if (user.isOAuth) {
    data.email = undefined;
    data.password = undefined;
    data.newPassword = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== dbUser.email) {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use.' };
    }

    const verificationToken = await generateVerificationToken(data.email);
    await sendVerificationEmail(data.email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(data.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: 'Invalid password.' };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    data.password = hashedPassword;
    data.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...data,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isTwoFactorEnabled: data.isTwoFactorEnabled,
    },
  });

  return { success: 'Settings updated!' };
}
