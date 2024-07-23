import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		event: z.object({
			title: z.string(),
			description: z.string(),
			start: z.coerce.date(),
			duration: z.tuple([z.number(), z.enum(["hour", "minute"])]),
		}).optional(),
	}),
});

export const collections = { blog };
