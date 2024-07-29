import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		Titel: z.string(),
		Bild: z.string(),
		Beschreibung: z.string(),
		Datum: z.string(),
		Uhrzeit: z.string(),
		Dauer: z.tuple([z.number(), z.enum(["hour", "minute"])]),
		Ort: z.string(),
		GoogleMaps: z.string().nullable(),
		Preis: z.number().nullable(),
		Newsletter: z.boolean().nullable(),
	})
});

export const collections = { blog };
