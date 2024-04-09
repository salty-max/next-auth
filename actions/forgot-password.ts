'use server';

import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ForgotPasswordSchema } from '@/schemas';

export async function forgotPassword(
  values: z.infer<typeof ForgotPasswordSchema>
) {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email.' };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found.' };
  }

  const resetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(resetToken.email, resetToken.token);

  return { success: 'Password reset email sent!' };
}
