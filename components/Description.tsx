import React from 'react'
import { formattedDateLong } from '../helpers/fctns'
import { GameContextObj, OverviewObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import { Companies } from '../../backendga/helpers/requests'

type DescriptionProps = {
	title: string,
	involved_companies: Companies[],
	summary: string,
	story: string,
	releaseDate: string
}

const Description = ({ title, involved_companies, summary, story, releaseDate }: DescriptionProps) => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	// const response: GameDetailObj = useContext(GameContext)

	return (
		<>
			{title && involved_companies && summary && story && releaseDate ?
				<div>
					<h2>Official Description</h2>
					<div className='shrink-headings toggle-long-text line-clamp'>
						<p className='text-desc'>
							{summary}
						</p>
						<p className='text-desc'>
							In&nbsp;
							<strong>
								<em>{title}</em>
							</strong>
							,&nbsp;{story.charAt(0).toLowerCase() + story.slice(1)}
						</p>
						<p className='text-desc'>
							Released by {involved_companies.map((company: Companies) => company.name).join(', ')} on {formattedDateLong(releaseDate)}.
						</p>
					</div>
				</div>
				: <></>}
		</>
	)
}

export { Description }