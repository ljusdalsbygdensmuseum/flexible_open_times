import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

import FohExtraHours from './components/foh-extra-hours';

domReady( () => {
    const root = createRoot(
        document.getElementById( 'foh-extra-hours_container')!
    );

    root.render( <><FohExtraHours /></> );
} );
