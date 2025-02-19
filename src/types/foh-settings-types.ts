import { TypeOf, z } from 'zod'

const TimeInputValue = z.object({
	hours: z.number(),
	minutes: z.number(),
})

export const HourSchema = z.object({
	id: z.number(),
	open: TimeInputValue,
	close: TimeInputValue,
})

export const DaySchema = z.object({
	dayInt: z.number().int(),
	title: z.string(),
	hours: z.array(HourSchema),
})

export type Hour = z.infer<typeof HourSchema>

export type Day = z.infer<typeof DaySchema>
