/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { GameContextObj, GameDetailObj, LanguageObj, LanguageTable, LocalStorageObj } from '../../helpers/fetypes'
import { Companies, GlobalAuxiliaryObj, Languages } from '../../../backendga/helpers/betypes'
import { useGameContext } from '@/app/gamecontext'
import { createAuxiliaryConfig, retrieveLocalStorageObj, searchtermToString, splitRouteQuery } from '../../helpers/fctns'
import { NavGame } from '../Server/NavGame'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'


type LanguageProps = {
	dataFetch: LanguageObj & GlobalAuxiliaryObj,
	gameID: number
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

const TableCells = ({ language_supports }: LanguageObj) => {
	const supportTypes = Array.from(new Set(language_supports.map((item: any) => item.language_support_type)))
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

const TableRows = ({ language_supports }: LanguageObj) => {
	const formattedLanguageTable: LanguageTable[] = createLanguageTable(language_supports)
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

const Languages = ({ dataFetch, gameID }: LanguageProps) => {

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
			<div>
				<Search />
				<div className='header-wrapper'>
					<NavGame title={dataFetch.title} gameID={gameID} searchterm={searchtermToString(useRouter().query.searchterm!)}/>
					<div>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
								<TableHead>
									<TableCells language_supports={dataFetch!.language_supports}/>
								</TableHead>
								<TableBody>
									<TableRows language_supports={dataFetch!.language_supports} />
								</TableBody>
							</Table>
						</TableContainer>
					</div>
					<Description auxiliaryObj={auxiliaryObj} />
				</div>
			</div>
		</div>
	)
}

export default Languages