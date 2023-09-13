/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react'
import { GameDetailObj, LanguageTable } from '../helpers/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Languages } from '../../backendga/helpers/requests'

type LanguageProps = {
	response: GameDetailObj
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
	console.log(formattedLanguageTable)
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

const Language = ({ response }: LanguageProps) => {
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
					<TableHead>
						<TableCells response={response}/>
					</TableHead>
					<TableBody>
						<TableRows response={response} />
					</TableBody>
				</Table>
			</TableContainer>
		</div>

	)
}

export { Language }