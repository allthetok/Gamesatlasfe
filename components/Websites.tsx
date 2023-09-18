/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { NavGame } from './NavGame'
import { Description } from './Description'
import { Search } from './Search'
import { WebsiteCategories } from '../assets/ratingsvglinks'
import { Categories } from '../../backendga/helpers/requests'
import { GameDetailObj, GameContextObj } from '../helpers/types'
import { useGameContext } from '@/app/gamecontext'
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

const Websites = () => {
	const { dataFetch, error, loading }: GameContextObj = useGameContext()

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
						<NavGame/>
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
						<Description/>
					</div>
				</div>
				: <></>
			}
		</div>
	)
}

export { Websites }