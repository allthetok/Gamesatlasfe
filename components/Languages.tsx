/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { GameContextObj, GameDetailObj, LanguageObj, LanguageTable, LocalStorageObj } from '../helpers/fetypes'
import { Languages } from '../../backendga/helpers/betypes'
import { useGameContext } from '@/app/gamecontext'
import axios from 'axios'
import { Loading } from './Loading'
import { createAuxiliaryConfig, retrieveLocalStorageObj, splitRouteQuery } from '../helpers/fctns'


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
				<TableCell key={item} align='center' sx={{ minWidth: 300, color: '#ddd' }}>
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
	// const { dataFetch, error, loading }: GameContextObj = useGameContext()

	const [dataFetch, setDataFetch] = useState<LanguageObj>()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [auxiliaryObj, setAuxiliaryObj] = useState<LocalStorageObj>(retrieveLocalStorageObj(false))
	const [gameID, setGameID] = useState<number>(parseInt(splitRouteQuery(useRouter().asPath, '?').replace('id=','')))


	// const searchConfig = createAuxiliaryConfig('post', 'language', auxiliaryObj.gameID)
	// const getGameDtl = useCallback(async () => {
	// 	await axios(searchConfig)
	// 		.then((response) => {
	// 			setDataFetch(response.data)
	// 			setLoading(false)
	// 		})
	// 		.catch((err) => {
	// 			setError(err)
	// 			console.error(err)

	// 		})
	// }, [auxiliaryObj.gameID])

	// useEffect(() => {
	// 	getGameDtl()
	// }, [getGameDtl])

	const searchConfig = createAuxiliaryConfig('post', 'language', gameID)
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
										<TableCells response={dataFetch!}/>
									</TableHead>
									<TableBody>
										<TableRows response={dataFetch!} />
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

export { Languages }