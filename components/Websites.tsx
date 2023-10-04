/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { WebsiteCategories } from '../assets/ratingsvglinks'
import { Categories } from '../../backendga/helpers/requests'
import { GameDetailObj, GameContextObj, WebsiteObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'
import axios from 'axios'


type WebsiteProps = {
	response: WebsiteObj
}

const TableCells = () => {
	return (
		<TableRow>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				Category
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				URL
			</TableCell>
		</TableRow>
	)
}

const TableRows = ( { response }: WebsiteProps) => {
	return (
		<>
			{response.websites.map((item: Categories) => (
				<TableRow sx={{ textAlign: 'center' }}>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						{`${WebsiteCategories.filter((field) => field.source === item.category)[0].category}`}
						<img className='logo pad-left' alt={`${WebsiteCategories.filter((field) => field.source === item.category)[0].category}`} src={`${WebsiteCategories.filter((field) => field.source === item.category)[0].src}`} />
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<a href={item.url} target='_blank' rel='noreferrer'>{item.url}</a>
					</TableCell>
				</TableRow>
			)
			)}
		</>
	)
}

const Websites = () => {
	// const [gameId, setGameId] = useState(() => {
	// 	const gameId = localStorage.getItem('gameid')
	// 	const initialVal = JSON.parse(gameId!)
	// 	return initialVal || null
	// })
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	const [gameId, setGameId] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('gameID') || null
		}
	})
	const [dataFetch, setDataFetch] = useState<WebsiteObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/websites',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameId
		}
	}
	const getGameDtl = useCallback(async () => {
		await axios(searchConfig)
			.then((response) => {
				setDataFetch(response.data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err)
				console.error(err)

			})
	}, [gameId])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{loading ?
				<div>Loading...</div>
				: <></>
			}
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={dataFetch.title} loading={loading} error={error} />
						<div>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
									<TableHead>
										<TableCells/>
									</TableHead>
									<TableBody>
										<TableRows response={dataFetch} />
									</TableBody>
								</Table>
							</TableContainer>
						</div>
						<Description title={dataFetch.title} involved_companies={dataFetch.involved_companies} summary={dataFetch.summary} story={dataFetch.story} releaseDate={dataFetch.releaseDate} loading={loading} error={error} />
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Websites }