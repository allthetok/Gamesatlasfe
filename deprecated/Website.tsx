/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react'
import { GameDetailObj } from '../helpers/fetypes'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { WebsiteCategories } from '../assets/ratingsvglinks'
import { Categories } from '../../backendga/helpers/requests'
import './GameDtl.css'

type WebsiteProps = {
	response: GameDetailObj
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

const Website = ({ response }: WebsiteProps) => {
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
					<TableHead>
						<TableCells/>
					</TableHead>
					<TableBody>
						<TableRows response={response} />
					</TableBody>
				</Table>
			</TableContainer>
		</div>

	)
}

export { Website }