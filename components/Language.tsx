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
				<TableCell align='center' sx={{ minWidth: 434.66 }}>
					{item}
				</TableCell>
			))}
		</TableRow>
	)
}
const Language = ({ response }: LanguageProps) => {
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22', color: '#ddd' }} aria-label='language table'>
					<TableRow sx={{ textAlign: 'center' }}>
						<TableCells response={response}/>
					</TableRow>
				</Table>
			</TableContainer>
		</div>
	)
}

export { Language }