import React from 'react'
import ReactLoading from 'react-loading'
import { LocalStorageObj } from '../../helpers/fetypes'
import { Description } from './Description'
import { NavGame } from './NavGame'
import { Search } from './Search'
import './Loading.css'

type LoadingProps = {
	auxiliaryObj: LocalStorageObj
}

const Loading = ({ auxiliaryObj }: LoadingProps) => {
	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame title={auxiliaryObj.title} gameID={auxiliaryObj.gameID}/>
				<div className='loading'>
					<ReactLoading
						type={'spinningBubbles'}
						color={'#ddd'}
						height={150}
						width={150}
					/>
					<h1 className='loading-h2'>Loading...</h1>
				</div>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export { Loading }