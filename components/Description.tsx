import React, { useContext } from 'react'
import { GameDetailObj } from '../helpers/types'
import { formattedDateLong } from '../helpers/fctns'
import { GameContext } from '@/app/gamecontext'


// type DescriptionProps = {
// 	response: GameDetailObj
// }

const Description = () => {
	const response: GameDetailObj = useContext(GameContext)
	return (
		<>
			<h2>Official Description</h2>
			<div className='shrink-headings toggle-long-text line-clamp'>
				<p className='text-desc'>
					{response.summary}
				</p>
				<p className='text-desc'>
						In&nbsp;
					<strong>
						<em>{response.title}</em>
					</strong>
						,&nbsp;{response.story.charAt(0).toLowerCase() + response.story.slice(1)}
				</p>
				<p className='text-desc'>
						Released by {response.involved_companies.map(company => company.name).join(', ')} on {formattedDateLong(response.releaseDate)}.
				</p>
			</div>
		</>
	)
}

export { Description }