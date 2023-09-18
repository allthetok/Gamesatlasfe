import React, { useContext } from 'react'
import { formattedDateLong } from '../helpers/fctns'
import { GameDetailObj, GameContextObj } from '../helpers/types'
import { ContextDtl, useGameContext } from '@/app/gamecontext'


// type DescriptionProps = {
// 	response: GameDetailObj
// }

const Description = () => {
	const { dataFetch, error, loading }: GameContextObj = useGameContext()
	// const response: GameDetailObj = useContext(GameContext)
	return (
		<>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
				<div>
					<h2>Official Description</h2>
					<div className='shrink-headings toggle-long-text line-clamp'>
						<p className='text-desc'>
							{dataFetch.summary}
						</p>
						<p className='text-desc'>
							In&nbsp;
							<strong>
								<em>{dataFetch.title}</em>
							</strong>
							,&nbsp;{dataFetch.story.charAt(0).toLowerCase() + dataFetch.story.slice(1)}
						</p>
						<p className='text-desc'>
							Released by {dataFetch.involved_companies.map(company => company.name).join(', ')} on {formattedDateLong(dataFetch.releaseDate)}.
						</p>
					</div>
				</div>
				: <></>}
		</>
	)
}

export { Description }