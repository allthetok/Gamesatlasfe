import React from 'react'
import { NavButton } from './NavButton'
import { buttonArray } from '../helpers/button'
import { ButtonField } from '../helpers/fetypes'
import './GameDtl.css'

const NavButtonList = () => {
	return (
		<ul className='nav-tabs mb'>
			{buttonArray.map((el: ButtonField) => (
				<li className='nav-tabs-li' key={el.link}>
					<NavButton link={el.link} formatName={el.formatName} />
				</li>
			))}
		</ul>
	)
}

export { NavButtonList }