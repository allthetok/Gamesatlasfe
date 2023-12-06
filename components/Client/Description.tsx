import React from 'react'
import { formattedDateLong } from '../../helpers/fctns'
import { LocalStorageObj } from '../../helpers/fetypes'
import '../Server/GameDtl.css'

type DescriptionProps = {
	auxiliaryObj: LocalStorageObj
}

const Description = ({ auxiliaryObj }: DescriptionProps) => {

	return (
		<>
			{auxiliaryObj ?
				<div>
					<h2 className='h2-game'>Official Description</h2>
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