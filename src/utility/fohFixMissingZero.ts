export default function fohFixMissingZero(number: number) {
	if (number.toString().length == 1) {
		return '0' + number.toString()
	}
	return number
}
