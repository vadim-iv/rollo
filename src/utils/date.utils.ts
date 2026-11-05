export function getDateStringInTimeZone(date: Date, timeZone: string): string {
	const parts = new Intl.DateTimeFormat('en-CA', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).formatToParts(date)

	const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))

	return `${values.year}-${values.month}-${values.day}`
}

export function addDaysToDateString(date: string, days: number): string {
	const parsedDate = new Date(`${date}T00:00:00Z`)
	parsedDate.setUTCDate(parsedDate.getUTCDate() + days)
	return parsedDate.toISOString().slice(0, 10)
}

export function formatDateOnly(date: string): string {
	return new Intl.DateTimeFormat('en-GB', {
		timeZone: 'UTC',
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	}).format(new Date(`${date}T00:00:00Z`))
}
