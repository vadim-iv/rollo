type DailySpendingInput = {
    date: string
    amount: string
}

export type CalculateBudgetInput = {
    amount: string
    startDate: string
    endDate: string
    dailySpendings: DailySpendingInput[]
}

export type DailyBudget = {
    date: string
    baseAllowance: string
    spent: string
    available: string
    remaining: string
}

function toCents(amount: string) : number {
    const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(amount)

    if (!match) throw new Error(`Invalid amount: ${amount}`)

    const whole = Number(match[1])
    const fractional = Number((match[2] || "").padEnd(2, '0'))

    return whole * 100 + fractional
}

function toMoney(cents: number) : string {
    const sign = cents < 0 ? '-' : ''
    const absCents = Math.abs(cents)

    const whole = Math.floor(absCents / 100)
    const fractional = absCents % 100

    return `${sign}${whole}.${fractional.toString().padStart(2, '0')}`
}

export function calculateBudget({
    amount,
    startDate,
    endDate,
    dailySpendings
} : CalculateBudgetInput): DailyBudget[] {
    const totalCents = toCents(amount)

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime()) ||
        start.toISOString().slice(0, 10) !== startDate ||
        end.toISOString().slice(0, 10) !== endDate ||
        start > end
    ) {
        throw new Error(`Invalid date range: ${startDate} - ${endDate}`)
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const baseCents = Math.floor(totalCents / totalDays)
    const extraCents = totalCents % totalDays

    const spendingByDate = new Map<string, number>()

    for (const spending of dailySpendings) {
       spendingByDate.set(spending.date, toCents(spending.amount))
    }

    const days: DailyBudget[] = []
    let carryoverCents = 0

    for (let i = 0; i < totalDays; i++) {
        const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        const dailyBaseCents = baseCents + (i < extraCents ? 1 : 0)
        const spentCents = spendingByDate.get(date) || 0
        const availableCents = dailyBaseCents + carryoverCents
        const remainingCents = availableCents - spentCents

        days.push({
            date,
            baseAllowance: toMoney(dailyBaseCents),
            spent: toMoney(spentCents),
            available: toMoney(availableCents),
            remaining: toMoney(remainingCents)
        })

        carryoverCents = remainingCents
    }

    return days
}