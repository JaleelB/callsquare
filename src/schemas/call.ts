import { z } from "zod";

export const joinCallFormSchema = z.object({
    name: z.string().optional(),
    meetingLink: z.string().nonempty("A meeting address link is required to join a call"),
});
  