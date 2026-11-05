// @ts-ignore
import { describe, expect, test } from 'bun:test'
import { addDaysToDateString, getDateStringInTimeZone } from '../utils/date.utils'

describe('date utilities', () => {
	test('uses the calendar date in the requested timezone', () => {
		const date = new Date('2026-11-05T22:39:00.000Z')

		expect(getDateStringInTimeZone(date, 'Europe/Helsinki')).toBe('2026-11-06')
	})

	test('adds calendar days without timezone drift', () => {
		expect(addDaysToDateString('2026-11-06', -1)).toBe('2026-11-05')
		expect(addDaysToDateString('2026-11-06', 1)).toBe('2026-11-07')
	})
})
