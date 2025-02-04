import domReady from '@wordpress/dom-ready'
import { createRoot } from '@wordpress/element'

import {FohTemporaryHours} from './components/foh-temporary-hours'

domReady(() => {
    const root = createRoot(document.getElementById('foh-temporary-hours_container')!)

    root.render(
        <>
            <FohTemporaryHours/>
        </>
    )
})