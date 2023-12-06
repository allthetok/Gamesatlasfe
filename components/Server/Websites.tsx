/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, {  } from 'react'
import { useRouter } from 'next/router'
import { WebsiteObj, LocalStorageObj, Categories, Companies, GlobalAuxiliaryObj } from '../../helpers/fetypes'
import { searchtermToString } from '../../helpers/fctns'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import { NavGame } from '../Server/NavGame'
import { GameTableSx, TableCell300Sx, TableCellColourSx, TextAlignSx } from '../../sxstyling/styles'
import { WebsiteCategories } from '../../assets/ratingsvglinks'
import './GameDtl.css'


type WebsiteProps = {
	dataFetch: WebsiteObj & GlobalAuxiliaryObj,
	gameID: number
}

const TableCells = () => {
	return (
		<TableRow>
			<TableCell align='center' sx={TableCell300Sx}>
				Category
			</TableCell>
			<TableCell align='center' sx={TableCell300Sx}>
				URL
			</TableCell>
		</TableRow>
	)
}

const TableRows = ({ websites }: WebsiteObj) => {
	return (
		<>
			{websites.map((item: Categories) => (
				<TableRow key={item.category} sx={TextAlignSx}>
					<TableCell align='center' sx={TableCellColourSx}>
						{`${WebsiteCategories.filter((field) => field.source === item.category)[0].category}`}
						<img className='logo pad-left' alt={`${WebsiteCategories.filter((field) => field.source === item.category)[0].category}`} src={`${WebsiteCategories.filter((field) => field.source === item.category)[0].src}`} />
					</TableCell>
					<TableCell align='center' sx={TableCellColourSx}>
						<a href={item.url} target='_blank' rel='noreferrer'>{item.url}</a>
					</TableCell>
				</TableRow>
			)
			)}
		</>
	)
}

const Websites = ({ dataFetch, gameID }: WebsiteProps) => {

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
			<Search />
			<div className='header-wrapper'>
				<NavGame title={auxiliaryObj.title} gameID={gameID} searchterm={searchtermToString(useRouter().query.searchterm!)}/>
				<div>
					<TableContainer component={Paper}>
						<Table sx={GameTableSx} aria-label='language table'>
							<TableHead>
								<TableCells/>
							</TableHead>
							<TableBody>
								<TableRows websites={dataFetch!.websites} />
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default Websites