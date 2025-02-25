import { z } from 'zod'

export const TimeInputValue = z.object({
	// from '@wordpress/components/build-types/date-time/types'
	hours: z.number(),
	minutes: z.number(),
})
export const DatePickerEventSchema = z.object({
	// from "@wordpress/components/build-types/date-time/types"
	date: z.union([z.date(), z.string()]),
})

export const DatesSchema = z.array(DatePickerEventSchema)

export const HourSchema = z.object({
	open: TimeInputValue,
	close: TimeInputValue,
})

export const DaySchema = z.object({
	dayInt: z.number().int().optional(),
	title: z.string(),
	hours: z.array(HourSchema),
})

export const DaysSchema = z.array(DaySchema)

export const DatesRangeSchema = z.object({
	start: DatePickerEventSchema,
	end: DatePickerEventSchema,
})

export const ExtraHoursSchema = DaySchema.extend({
	id: z.number(),
	message: z.string(),
	dates: z.array(DatePickerEventSchema),
	hours: z.array(DaySchema),
})
export const TemporaryHoursSchema = DaySchema.extend({
	id: z.number(),
	dates: DatesRangeSchema,
	hours: z.array(DaySchema),
})

export const AllHoursDataSchema = z.object({
	normal_hours: z.array(DaySchema),
	extra_hours: z.array(ExtraHoursSchema),
	temporary_hours: z.array(TemporaryHoursSchema),
})

export type Dates = z.infer<typeof DatesSchema>

export type Hour = z.infer<typeof HourSchema>

export type Day = z.infer<typeof DaySchema>

export type Days = z.infer<typeof DaysSchema>

export type DatesRange = z.infer<typeof DatesRangeSchema>

export type AllHoursData = z.infer<typeof AllHoursDataSchema>

export type ExtraHoursData = z.infer<typeof ExtraHoursSchema>

export type TemporaryHoursData = z.infer<typeof TemporaryHoursSchema>
