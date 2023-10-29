/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
// import Youtube, { YouTubeProps } from 'react-youtube'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../../helpers/fctns'
import { Companies, GlobalAuxiliaryObj, Videos } from '../../../backendga/helpers/betypes'
import { GameContextObj, LocalStorageObj, VideoObj } from '../../helpers/fetypes'
import Carousel from 'react-material-ui-carousel'
import { useGameContext } from '@/app/gamecontext'
import { Video } from './Video'
import { NavGame } from '../Client/NavGame'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import '../Client/Artworks.css'

type VideoListProps = {
	dataFetch: VideoObj & GlobalAuxiliaryObj,
	gameID: number
}

const VideoList = ({ dataFetch, gameID }: VideoListProps) => {

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
				<NavGame title={dataFetch.title} gameID={gameID} />
				<Carousel autoPlay={false}>
					{dataFetch?.videos.map((el: Videos) => (
						<Video videoId={el.ytlink} name={el.name} />
					))}
				</Carousel>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default VideoList