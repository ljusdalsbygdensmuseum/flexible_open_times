import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import DisplayAllOpenHours from './components/foh-block-display-all-open-hours'

domReady(() => {
	const elements = document.querySelectorAll(
		'.wp-block-flexible-open-hours-openhours'
	)
	elements.forEach((element) => {
		const root = createRoot(element!)
		root.render(
			<>
				<DisplayAllOpenHours
					title='Open Hours'
					showExtra={true}
					showTemporary={true}
				/>
			</>
		)
	})
})
