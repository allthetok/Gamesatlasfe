import React from 'react'
import { NavButton } from './NavButton'
import { buttonArray } from '../helpers/button'
import { ButtonField } from '../helpers/types'
import './GameDtl.css'

type NavButtonListProps = {
	tabSelect: string,
	handleActiveChange: (tabSelected: string) => void
}

const NavButtonList = ({ tabSelect, handleActiveChange }: NavButtonListProps) => {
	return (
		<ul className='nav-tabs mb'>
			{buttonArray.map((el: ButtonField) => (
				<li className='nav-tabs-li' key={el.stateSrc}>
					<NavButton tabSelect={tabSelect} handleActiveChange={handleActiveChange} src={el.stateSrc} formatName={el.formatName} />
				</li>
			))}
		</ul>
	)
}

export { NavButtonList }