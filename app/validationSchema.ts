import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, "title can't be empty").max(255),
    description: z.string().min(10, "Description must have at least 10 characters")
});
