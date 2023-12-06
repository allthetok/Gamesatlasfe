/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Categories } from '../../backendga/helpers/betypes'
import { GameDetailObj, GameContextObj, WebsiteObj, LocalStorageObj } from '../helpers/fetypes'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../helpers/fctns'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useGameContext } from '@/app/gamecontext'
import { Loading } from '../components/Client/Loading'
import { NavGame } from './NavGame'
import { Description } from '../components/Client/Description'
import { Search } from '../components/Client/Search'
import { WebsiteCategories } from '../assets/ratingsvglinks'
import './GameDtl.css'
import { createDeprecatedNestedConfig } from '../helpers/fctns'

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
						{`${WebsiteCategories.filter((field: any) => field.source === item.category)[0].category}`}
						<img className='logo pad-left' alt={`${WebsiteCategories.filter((field: any) => field.source === item.category)[0].category}`} src={`${WebsiteCategories.filter((field) => field.source === item.category)[0].src}`} />
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

	const [dataFetch, setDataFetch] = useState<WebsiteObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))

	const [gameID, setGameID] = useState<number>(parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=','')))

	const searchConfig = createDeprecatedNestedConfig('post', 'websites', gameID)
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
	}, [gameID])

	useEffect(() => {
		getGameDtl()
	}, [getGameDtl])

	return (
		<div>
			{!loading && !error && dataFetch ?
				<div>
					<Search />
					<div className='header-wrapper'>
						<NavGame title={auxiliaryObj.title} gameID={gameID} />
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