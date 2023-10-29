import React from 'react'
import { NavButton } from './NavButton'
import { ssrButtonArray } from '../../helpers/button'
import { ButtonField } from '../../helpers/fetypes'
import './GameDtl.css'

type NavButtonListProps = {
	gameID: number,
	searchterm: string
}

const NavButtonList = ({ gameID, searchterm }: NavButtonListProps) => {
	return (
		<ul className='nav-tabs mb'>
			{ssrButtonArray.map((el: ButtonField) => (
				<li className='nav-tabs-li' key={el.link}>
					<NavButton link={el.link} formatName={el.formatName} gameID={gameID} searchterm={searchterm} />
				</li>
			))}
		</ul>
	)
}


export { NavButtonList }