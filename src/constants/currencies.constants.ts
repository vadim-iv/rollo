export type Currency = {
	value: string
	label: string
	symbol?: string
}

export const currencies: Currency[] = [
	{ value: 'RON', label: 'RON — Romanian Leu' },
	{ value: 'EUR', label: 'EUR — Euro', symbol: '€' },
	{ value: 'USD', label: 'USD — US Dollar', symbol: '$' },
	{ value: 'GBP', label: 'GBP — British Pound', symbol: '£' },
	{ value: 'MDL', label: 'MDL — Moldovan Leu' }
] as const
