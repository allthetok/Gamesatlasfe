/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import ReactLoading from 'react-loading'
import { GameContextObj, GameDetailObj, LanguageObj, LanguageTable } from '../helpers/types'
import { Languages } from '../../backendga/helpers/requests'
import { useGameContext } from '@/app/gamecontext'
import axios from 'axios'


type LanguageProps = {
	response: LanguageObj
}

const createLanguageTable = (language_supports: Languages[]) => {
	const languageFormat: LanguageTable[] = []
	let currentLanguage: any
	let arrSupportTypes: string[]
	const languages = Array.from(new Set(language_supports.map((item: any) => (item.language))))
	for (let i = 0; i < languages.length; i++) {
		currentLanguage = language_supports.filter((item: any) => item.language === languages[i])
		arrSupportTypes = currentLanguage.map((item: any) => item.language_support_type)
		languageFormat.push({
			language: languages[i],
			locale: currentLanguage[0].locale,
			native: currentLanguage[0].native,
			language_support_types: populateArrSupportTypes(arrSupportTypes)
		})
	}
	return languageFormat
}

const populateArrSupportTypes = (arrSupportTypes: string[]) => {
	const formattedArr: string[] = ['','','']
	for (let i = 0; i < formattedArr.length; i++) {
		switch (i) {
		case 0:
			formattedArr[i] = arrSupportTypes.filter((item: any) => item === 'Interface').length !== 0 ? 'Interface' : ''
			break
		case 1:
			formattedArr[i] = arrSupportTypes.filter((item: any) => item === 'Audio').length !== 0 ? 'Audio' : ''
			break
		case 2:
			formattedArr[i] = arrSupportTypes.filter((item: any) => item === 'Subtitles').length !== 0 ? 'Subtitles' : ''
			break
		default:
			formattedArr[i] = ''
		}
	}
	return formattedArr
}

const TableCells = ({ response }: LanguageProps) => {
	const supportTypes = Array.from(new Set(response.language_supports.map((item: any) => item.language_support_type)))
	return (
		<TableRow>
			{supportTypes.map((item: any) => (
				<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
					{item}
				</TableCell>
			))}
		</TableRow>
	)
}

const TableRows = ( { response }: LanguageProps) => {
	const formattedLanguageTable: LanguageTable[] = createLanguageTable(response.language_supports)
	return (
		<>
			{formattedLanguageTable.map((item: LanguageTable) => (
				<TableRow sx={{ textAlign: 'center' }}>
					{item.language_support_types.map((arr: any) => (
						<TableCell align='center' sx={{ color: '#ddd' }}>
							{arr !== '' ? `${item.native} (${item.locale})` : ''}
						</TableCell>
					)
					)}
				</TableRow>
			)
			)}
		</>
	)
}

const Languages = () => {
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
	const [dataFetch, setDataFetch] = useState<LanguageObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const searchConfig = {
		method: 'post',
		url: 'http://localhost:3001/api/language',
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
				<ReactLoading
					type={'spinningBubbles'}
					color={'#ddd'}
					height={100}
					width={100}
			  	/>
				:
				<></>
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
										<TableCells response={dataFetch!}/>
									</TableHead>
									<TableBody>
										<TableRows response={dataFetch!} />
									</TableBody>
								</Table>
							</TableContainer>
						</div>
						<Description title={dataFetch.title} involved_companies={dataFetch.involved_companies} summary={dataFetch.summary} story={dataFetch.story} releaseDate={dataFetch.releaseDate} loading={loading} error={error} />
					</div>
				</div>
				: <></>}
		</div>
	)
}

export { Languages }