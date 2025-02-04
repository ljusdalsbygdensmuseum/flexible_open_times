import {
	Flex,
	FlexItem,
	FlexBlock,
	PanelRow,
	TimePicker,
	Button,
} from '@wordpress/components'

import { Hour } from './foh-settings-types'
import { TimeInputValue } from '@wordpress/components/build-types/date-time/types'

interface Props {
	hours: Hour[]
	onRemoveItem: (item: Hour) => void
	onChangeItem: (newTime: TimeInputValue, open: boolean, item: Hour) => void
}

export function Times({ hours, onRemoveItem, onChangeItem }: Props) {
	const theTimes = hours.map((timeObj: Hour) => {
		return (
			<PanelRow>
				<Flex align='flex-end'>
					<FlexItem>
						<TimePicker.TimeInput
							label='Open'
							value={timeObj.open}
							onChange={(newTime) => {
								onChangeItem(newTime, true, timeObj)
							}}
						/>
					</FlexItem>
					<FlexItem>
						<TimePicker.TimeInput
							label='Close'
							value={timeObj.close}
							onChange={(newTime) => {
								onChangeItem(newTime, false, timeObj)
							}}
						/>
					</FlexItem>
					<FlexBlock>
						<Button
							isDestructive
							variant='tertiary'
							onClick={() => {
								onRemoveItem(timeObj)
							}}
						>
							Remove
						</Button>
					</FlexBlock>
				</Flex>
			</PanelRow>
		)
	})

	return theTimes
}
