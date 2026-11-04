interface IDaysLeftCard {
	startDateString: string
	endDateString: string
}

export function DaysLeftCard({ startDateString, endDateString }: IDaysLeftCard) {
	const now = new Date()
	const startDate = new Date(startDateString)
	const endDate = new Date(endDateString)

	const daysUntilStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

	const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

	const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
	const progress = Math.max(0, Math.min(((totalDays - daysLeft) / totalDays) * 100, 100))

	return (
		<div className='w-full mt-1 bg-surface rounded-2xl py-1 px-1.5 border-border border'>
			<p className='text-xs text-secondary-text font-semibold'>
				{daysUntilStart > 0 ? 'Days until start' : daysLeft > 0 ? `Days left` : 'Days after end'}
			</p>

			<p className='text-[1.125rem] text-primary-text font-bold'>
				{daysUntilStart > 0 ? daysUntilStart : daysLeft > 0 ? daysLeft : Math.abs(daysLeft)}
			</p>

			<p className='text-secondary-text text-xs font-normal'>
				until {endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
			</p>

			<div className='w-full mt-0.5 h-0.25 bg-border rounded-full'>
				<div
					className={`transition-colors_transform duration-300 h-full ${daysLeft < 0 ? 'bg-error' : 'bg-accent'} rounded-full origin-left`}
					style={{ transform: `scaleX(${progress}%)` }}
				/>
			</div>
		</div>
	)
}
