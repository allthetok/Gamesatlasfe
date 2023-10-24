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
import { Categories } from '../../backendga/helpers/betypes'
import { GameDetailObj, GameContextObj, WebsiteObj } from '../helpers/fetypes'
import { useGameContext } from '@/app/gamecontext'
import './GameDtl.css'
import axios from 'axios'
import { Loading } from './Loading'
import { createAuxiliaryConfig } from '../helpers/fctns'


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
				<TableRow key={item.category} sx={{ textAlign: 'center' }}>
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
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()
	// const [gameId, setGameId] = useState(() => {
	// 	if (typeof window !== 'undefined') {
	// 		return localStorage.getItem('gameID') || null
	// 	}
	// })

	const [auxiliaryObj, setAuxiliaryObj]: any = useState(() => {
		if (typeof window !== 'undefined'){
			const localstorageObj =  localStorage.getItem('auxiliaryObj')
			return JSON.parse(localstorageObj!)
		}
	})

	const [dataFetch, setDataFetch] = useState<WebsiteObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const searchConfig = createAuxiliaryConfig('post', 'websites', auxiliaryObj.gameID)

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
	}, [auxiliaryObj.gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} />
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
						<Description auxiliaryObj={auxiliaryObj} />
					</div>
				</div>
				:
				<Loading auxiliaryObj={auxiliaryObj}/>
			}
		</div>
	)
}

export { Websites }