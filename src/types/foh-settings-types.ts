import { z } from 'zod'

const TimeInputValue = z.object({
	// from '@wordpress/components/build-types/date-time/types'
	hours: z.number(),
	minutes: z.number(),
})
const DatePickerEventSchema = z.object({
	// from "@wordpress/components/build-types/date-time/types"
	date: z.union([z.date(), z.string()]),
})

export const HourSchema = z.object({
	open: TimeInputValue,
	close: TimeInputValue,
})

export const DaySchema = z.object({
	dayInt: z.number().int().optional(),
	title: z.string(),
	hours: z.array(HourSchema),
})

export const DatesRangeSchema = z.object({
	start: DatePickerEventSchema,
	end: DatePickerEventSchema,
})

const ExtraHoursSchema = DaySchema.extend({
	id: z.number(),
	message: z.string(),
	dates: z.array(DatePickerEventSchema),
})
const TemporaryHoursSchema = DaySchema.extend({
	id: z.number(),
	dates: DatesRangeSchema,
	hours: z.array(DaySchema),
})

export const AllHoursDataSchema = z.object({
	normal_hours: z.array(DaySchema),
	extra_hours: z.array(ExtraHoursSchema),
	temporary_hours: z.array(TemporaryHoursSchema),
})

export type DatePickerEvent = z.infer<typeof DatePickerEventSchema>

export type Hour = z.infer<typeof HourSchema>

export type Day = z.infer<typeof DaySchema>

export type DatesRange = z.infer<typeof DatesRangeSchema>

export type AllHoursData = z.infer<typeof AllHoursDataSchema>
