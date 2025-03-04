import {
	Flex,
	FlexItem,
	FlexBlock,
	PanelRow,
	TimePicker,
	Button,
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import { Hour, TimeInputValue } from '../types/foh-settings-types'

interface Props {
	hours: Hour[]
	onRemoveItem: (hourIndex: number) => void
	onChangeItem: (
		newTime: TimeInputValue,
		open: boolean,
		itemIndex: number
	) => void
}

export function Times({ hours, onRemoveItem, onChangeItem }: Props) {
	const theTimes = hours.map((timeObj: Hour, index) => {
		return (
			<PanelRow>
				<Flex align='flex-end'>
					<FlexItem>
						<TimePicker.TimeInput
							label={__('Open', 'flexible-open-hours-domain')}
							value={timeObj.open}
							onChange={(newTime) => {
								onChangeItem(newTime, true, index)
							}}
						/>
					</FlexItem>
					<FlexItem>
						<TimePicker.TimeInput
							label={__('Close', 'flexible-open-hours-domain')}
							value={timeObj.close}
							onChange={(newTime) => {
								onChangeItem(newTime, false, index)
							}}
						/>
					</FlexItem>
					<FlexBlock>
						<Button
							isDestructive
							variant='tertiary'
							onClick={() => {
								onRemoveItem(index)
							}}
						>
							{__('Remove', 'flexible-open-hours-domain')}
						</Button>
					</FlexBlock>
				</Flex>
			</PanelRow>
		)
	})

	return theTimes
}
