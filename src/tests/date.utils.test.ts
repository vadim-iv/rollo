// @ts-expect-error -- bun:test is provided by Bun rather than project TypeScript types.
import { describe, expect, test } from 'bun:test'
import {
	addDaysToDateString,
	getDateStringInTimeZone,
	getDaysLeftProgressPercent
} from '../utils/date.utils'

describe('date utilities', () => {
	test('uses the calendar date in the requested timezone', () => {
		const date = new Date('2026-11-05T22:39:00.000Z')

		expect(getDateStringInTimeZone(date, 'Europe/Helsinki')).toBe('2026-11-06')
	})

	test('adds calendar days without timezone drift', () => {
		expect(addDaysToDateString('2026-11-06', -1)).toBe('2026-11-05')
		expect(addDaysToDateString('2026-11-06', 1)).toBe('2026-11-07')
	})

	test('starts at full progress and decreases as days pass', () => {
		const startDate = new Date('2026-11-01T00:00:00.000Z')
		const endDate = new Date('2026-11-03T00:00:00.000Z')

		expect(getDaysLeftProgressPercent(startDate, endDate, startDate)).toBe(100)
		expect(getDaysLeftProgressPercent(startDate, endDate, new Date('2026-11-02T00:00:00.000Z'))).toBeCloseTo(200 / 3)
		expect(getDaysLeftProgressPercent(startDate, endDate, new Date('2026-11-04T00:00:00.000Z'))).toBe(0)
	})
})
