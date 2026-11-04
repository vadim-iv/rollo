import { currencies } from '@/constants/currencies.constants'

interface ProgressCircleProps {
	availableAmount: string
	remainingAmount: string
	spentAmount: string
	currency: string
}

export function ProgressCircle({
	availableAmount,
	remainingAmount,
	spentAmount,
	currency
}: ProgressCircleProps) {
	const displayCurrency = currencies.find((c) => c.value === currency)?.symbol || currency

	const available = Number(availableAmount)
	const remaining = Number(remainingAmount)
	const spent = Number(spentAmount)

	const isOverBudget = remaining < 0

	const progress = available > 0 ? Math.min(Math.max(remaining / available, 0), 1) : 0

	const size = 192
	const strokeWidth = 8
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius

	const strokeOffset = isOverBudget ? 0 : circumference * (1 - progress)

	return (
		<div>
			<h4 className='mb-1 text-center font-semibold text-base text-secondary-text'>
				{isOverBudget ? "Over today's limit" : 'Left to spend today'}
			</h4>

			<div className='relative'>
				<svg
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					className='-rotate-90'
					aria-hidden='true'
				>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill='none'
						stroke='currentColor'
						strokeOpacity={1}
						strokeWidth={strokeWidth}
						className='text-border'
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill='none'
						stroke='currentColor'
						className={`${isOverBudget ? 'text-error' : 'text-accent'}`}
						strokeWidth={strokeWidth}
						strokeLinecap='round'
						strokeDasharray={circumference}
						strokeDashoffset={strokeOffset}
						style={{
							transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease'
						}}
					/>
				</svg>

				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<span className='text-2xl font-bold text-primary-text'>
						{displayCurrency} {remaining.toFixed(2)}
					</span>
					<span className='text-sm text-secondary-text'>
						of {displayCurrency} {available.toFixed(2)}
					</span>
					<div className='w-2 h-px bg-border rounded-full my-0.25' />
					<span className='text-sm text-secondary-text'>
						{displayCurrency} {spent.toFixed(2)} spent
					</span>
				</div>
			</div>
		</div>
	)
}
