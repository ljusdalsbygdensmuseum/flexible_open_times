export default function isJSON(string: string) {
	try {
		JSON.parse(string)
	} catch (error) {
		return false
	}
	return true
}
