import { z } from 'zod';

export const joinSchema = z.object({
    name: z.string().refine((val) => val.length > 0, {
        message: 'Name is required',
    }),
    url: z.string().refine((val) => val.length > 0, {
        message: 'URL is required',
    }),
});

export const previewJoinSchema = z.object({
    name: z.string().refine((val) => val.length > 0, {
        message: 'Name is required',
    })
});