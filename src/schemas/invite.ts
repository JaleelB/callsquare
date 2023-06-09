import { z } from "zod";

export const inviteSchema = z.object({
    emails: z.array(z.string().email()),
});
  