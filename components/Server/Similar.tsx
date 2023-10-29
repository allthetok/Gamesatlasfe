/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../../helpers/fctns'
import { Companies, Explore, GlobalAuxiliaryObj, SimilarGamesObj } from '../../../backendga/helpers/betypes'
import { GameContextObj, LocalStorageObj } from '../../helpers/fetypes'
import { useGameContext } from '@/app/gamecontext'
import { IndGame } from '../Client/IndGame'
import { NavGame } from '../Client/NavGame'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import '../Client/IndGameList.css'
import './GameDtl.css'
import '../Client/Similar.css'

type SimilarProps = {
	dataFetch: SimilarGamesObj & GlobalAuxiliaryObj,
	gameID: number
}

const Similar = ({ dataFetch, gameID }: SimilarProps) => {
	const auxiliaryObj: LocalStorageObj = {
		gameID: gameID,
		title: dataFetch.title,
		involved_companies: dataFetch.involved_companies.map((company: Companies) => company.name).join(', '),
		summary: dataFetch.summary,
		story: dataFetch.story,
		releaseDate: dataFetch.releaseDate
	}

	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame title={auxiliaryObj.title} gameID={gameID}/>
				<div>
					<div className='similar-grid-wrapper'>
						{dataFetch.similar_games.map((item: Explore) => (
							<IndGame key={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} age_ratings={item.age_ratings} releaseDate={item.releaseDate} likes={item.likes!} title={item.title} genres={item.genres} companies={item.involved_companies} />
						))}
					</div>
				</div>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default Similar