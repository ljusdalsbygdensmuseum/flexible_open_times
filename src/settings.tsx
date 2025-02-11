import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import FohSettingsNormalHours from './components/foh-settings-normal-hours'

domReady(() => {
	const root = createRoot(
		document.getElementById('foh_normal_open_hours-input')!
	)

	root.render(
		<>
			<FohSettingsNormalHours />
		</>
	)
})
