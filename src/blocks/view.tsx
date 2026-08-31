import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import DisplayAllOpenHours from '../components/foh-block-display-all-open-hours'
import isJSON from '../utility/is-json'
import { openhoursBlockPropsSchema } from '../types/foh-openhours-props'

domReady(() => {
	const elements = document.querySelectorAll<HTMLElement>(
		'.wp-block-flexible-open-hours-openhours',
	)
	elements.forEach((element) => {
		if (!element.dataset.attributes || !isJSON(element.dataset.attributes)) {
			throw new Error('attributes not found')
		}

		const rawData = JSON.parse(element.dataset.attributes)

		if (!openhoursBlockPropsSchema.safeParse(rawData)) {
			throw new Error(
				openhoursBlockPropsSchema.safeParse(rawData).error?.message,
			)
		}

		const data = openhoursBlockPropsSchema.parse(rawData)

		const root = createRoot(element!)
		root.render(
			<>
				<DisplayAllOpenHours
					title='Open Hours'
					showExtra={true}
					showTemporary={true}
					{...data}
				/>
			</>,
		)
	})
})
