import React from 'react'
import { NavButton } from './NavButton'
import { buttonArray } from '../helpers/button'
import { ButtonField } from '../helpers/fetypes'
import './GameDtl.css'
import Link from 'next/link'

type NavButtonListProps = {
	gameID: number
}

const NavButtonList = ({ gameID }: NavButtonListProps) => {
	return (
		<ul className='nav-tabs mb'>
			{buttonArray.map((el: ButtonField) => (
				<li className='nav-tabs-li' key={el.link}>
					<NavButton link={el.link} formatName={el.formatName} gameID={gameID} />
				</li>
			))}
		</ul>
	)
}


export { NavButtonList }