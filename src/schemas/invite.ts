import { z } from 'zod';

export const inviteSchema = z.object({
  email: z.string().refine(value => /\S+@\S+\.\S+/.test(value), {
    message: 'Please enter a valid email address',
  }),
});
