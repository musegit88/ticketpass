import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    categoryId: z.string(),
    description: z.string().min(2, "Description must be at least 2 characters.").max(400, "Description must be at less than 400 characters."),
    location: z.string(),
    isOnline: z.boolean(),
    imageUrl: z.string(),
    isFree: z.boolean(),
    price: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    url: z.string() || z.string().url()
});