import { z } from "zod";

export const joinCallFormSchema = z.object({
    name: z.string().optional(),
    meetingLinkOrId: z.string(),
    audio: z.boolean(),
    video: z.boolean(),
});
  