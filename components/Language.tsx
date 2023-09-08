/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react'
import { GameDetailObj } from '../helpers/types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

type LanguageProps = {
	response: GameDetailObj
}

const TableCells = ({ response }: LanguageProps) => {
	const supportTypes = Array.from(new Set(response.language_supports.map((item: any) => item.language_support_type)))

	return (
		<TableRow>
			{supportTypes.map((item: any) => (
				<TableCell align='center' sx={{ minWidth: 434.66, color: '#ddd' }}>
					{item}
				</TableCell>
			))}
		</TableRow>
	)
}

const TableRows = ({ response }: LanguageProps) => {
	const supportTypes = Array.from(new Set(response.language_supports.map((item: any) => item.language_support_type)))
	const language = Array.from(new Set(response.language_supports.map((item: any) => (item.language))))
	return (
		<TableBody>
			{language.map((row) => (
				<div>
					{filterEachRow(response.language_supports.filter((item: any) => item.language === row), language)}
				</div>
			))}
		</TableBody>
	)
}

const filterEachRow = (filteredArr: any, language: any) => {
	console.log(filteredArr)
	console.log(language)
	return (
		<TableRow
			key='row'
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			{filteredArr.map((item: any) => {
				(
					<TableCell>
						{item.language} {item.locale}
					</TableCell>
				)
			})}
		</TableRow>
	)

}
const Language = ({ response }: LanguageProps) => {
	return (
		<>
			<div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
						<TableHead>
							<TableRow sx={{ textAlign: 'center' }}>
								<TableCells response={response}/>
							</TableRow>
						</TableHead>
						<TableRows response={response} />
					</Table>
				</TableContainer>
			</div>
		</>

	)
}

export { Language }