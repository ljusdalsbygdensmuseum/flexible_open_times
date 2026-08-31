/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'
import DisplayAllOpenHours from '../components/foh-block-display-all-open-hours'
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components'
import { BlockEditProps } from '@wordpress/blocks'
import { openhoursBlockProps } from '../types/foh-openhours-props'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<openhoursBlockProps>) {
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody>
					<PanelRow>
						<ToggleControl
							checked={attributes.animateOnEnter}
							onChange={(value) => setAttributes({ animateOnEnter: value })}
							label={__('Reveal on scroll', 'foh-domain')}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<DisplayAllOpenHours
				title='Open Hours'
				showExtra={true}
				showTemporary={true}
				animateOnEnter={attributes.animateOnEnter}
			/>
		</div>
	)
	//return <p {...useBlockProps()}></p>
}
