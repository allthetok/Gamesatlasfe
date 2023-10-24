import React from 'react'
import { formattedDateLong } from '../helpers/fctns'
import { GameContextObj, LocalStorageObj, OverviewObj } from '../helpers/fetypes'
import { useGameContext } from '@/app/gamecontext'
import { Companies } from '../../backendga/helpers/betypes'

// type DescriptionProps = {
// 	title: string,
// 	// involved_companies: Companies[],
// 	involved_companies: string,
// 	summary: string,
// 	story: string,
// 	releaseDate: string
// }

type DescriptionProps = {
	auxiliaryObj: LocalStorageObj
}

const Description = ({ auxiliaryObj }: DescriptionProps) => {
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	// const response: GameDetailObj = useContext(GameContext)

	return (
		<>
			{auxiliaryObj ?
				<div>
					<h2>Official Description</h2>
					<div className='shrink-headings toggle-long-text line-clamp'>
						<p className='text-desc'>
							{auxiliaryObj.summary}
						</p>
						<p className='text-desc'>
							In&nbsp;
							<strong>
								<em>{auxiliaryObj.title}</em>
							</strong>
							,&nbsp;{auxiliaryObj.story.charAt(0).toLowerCase() + auxiliaryObj.story.slice(1)}
						</p>
						<p className='text-desc'>
							Released by {auxiliaryObj.involved_companies} on {formattedDateLong(auxiliaryObj.releaseDate)}.
						</p>
					</div>
				</div>
				: <></>}
		</>
	)
}

export { Description }