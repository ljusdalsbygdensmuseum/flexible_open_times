import { number, z } from 'zod'

const TimeInputValue = z.object({
	// from '@wordpress/components/build-types/date-time/types'
	hours: z.number(),
	minutes: z.number(),
})
const DatePickerEvent = z.object({
	// from "@wordpress/components/build-types/date-time/types"
	date: z.string(),
})

export const HourSchema = z.object({
	id: z.number(),
	open: TimeInputValue,
	close: TimeInputValue,
})

export const DaySchema = z.object({
	dayInt: z.number().int().optional(),
	title: z.string(),
	hours: z.union([z.array(HourSchema), z.undefined()]),
})

export const DatesRangeSchema = z.object({
	start: DatePickerEvent,
	end: DatePickerEvent,
})

const ExtraHoursSchema = z.object({
	dayInt: z.number().int().optional(),
	title: z.string(),
	hours: z.union([z.array(HourSchema), z.undefined()]),
	id: z.number(),
	message: z.string(),
	dates: z.union([z.array(DatePickerEvent), z.undefined()]),
})
const TemporaryHoursSchema = DaySchema.extend({
	id: z.number(),
	dates: z.object({
		start: z.string(),
		end: z.string(),
	}),
})

export const AllHoursDataSchema = z.object({
	normal_hours: z.array(DaySchema),
	extra_hours: z.array(ExtraHoursSchema),
	temporary_hours: z.array(TemporaryHoursSchema),
})

export type Hour = z.infer<typeof HourSchema>

export type Day = z.infer<typeof DaySchema>

export type DatesRange = z.infer<typeof DatesRangeSchema>

export type AllHoursData = z.infer<typeof AllHoursDataSchema>
