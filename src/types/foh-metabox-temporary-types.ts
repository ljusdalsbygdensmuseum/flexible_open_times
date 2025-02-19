import { z } from 'zod'

export const DatesRangeSchema = z.object({
	start: z.object({
		date: z.date(),
	}),
	end: z.object({
		date: z.date(),
	}),
})

export type DatesRange = z.infer<typeof DatesRangeSchema>
