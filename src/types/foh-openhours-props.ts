import z from 'zod'

export const openhoursBlockPropsSchema = z.object({
	animateOnEnter: z.boolean(),
})

export type openhoursBlockProps = z.infer<typeof openhoursBlockPropsSchema>
