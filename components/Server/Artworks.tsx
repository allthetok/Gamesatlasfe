/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createAuxiliaryConfig, retrieveLocalStorageObj, searchtermToString, splitRouteQuery } from '../../helpers/fctns'
import { GameContextObj, AuxiliaryObj, ArtworkObj, LocalStorageObj, Companies, GlobalAuxiliaryObj } from '../../helpers/fetypes'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useGameContext } from '@/app/gamecontext'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import { NavGame } from '../Server/NavGame'
import './../Client/Artworks.css'
import './GameDtl.css'

type ArtworkProps = {
	dataFetch: ArtworkObj & GlobalAuxiliaryObj,
	gameID: number
}

const Artworks = ({ dataFetch, gameID }: ArtworkProps) => {
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
				<NavGame title={dataFetch.title} gameID={gameID} searchterm={searchtermToString(useRouter().query.searchterm!)}/>
				<Carousel NextIcon={<ArrowForwardIcon/>} PrevIcon={<ArrowBackIcon/>} stopAutoPlayOnHover={true} interval={10000} animation={'fade'}>
					{dataFetch?.artworks.map((el: string) => (
						<img key={el} className='image-carousel' src={el} alt='Artwork' />
					))}
				</Carousel>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default Artworks