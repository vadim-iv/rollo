const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

export function getDaysLeftProgressPercent(startDate: Date, endDate: Date, now: Date): number {
	const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY) + 1
	const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / MILLISECONDS_PER_DAY)
	const remainingDays = daysLeft + 1

	return totalDays > 0 ? Math.max(0, Math.min((remainingDays / totalDays) * 100, 100)) : 0
}

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
