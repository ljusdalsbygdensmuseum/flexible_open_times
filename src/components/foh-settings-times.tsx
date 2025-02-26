import {
	Flex,
	FlexItem,
	FlexBlock,
	PanelRow,
	TimePicker,
	Button,
} from '@wordpress/components'

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
							label='Open'
							value={timeObj.open}
							onChange={(newTime) => {
								onChangeItem(newTime, true, index)
							}}
						/>
					</FlexItem>
					<FlexItem>
						<TimePicker.TimeInput
							label='Close'
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
							Remove
						</Button>
					</FlexBlock>
				</Flex>
			</PanelRow>
		)
	})

	return theTimes
}
