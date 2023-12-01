/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Companies, Explore, Platforms } from '../../../backendga/helpers/betypes'
import { GenericStringObj, MultiObj } from '../../helpers/fetypes'
import { formattedDateLong } from '../../helpers/fctns'
import { TableRow, TableCell, TableContainer, Paper, Table, TableHead, TableBody, SvgIcon } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ESRB, PEGI, placeholderImages } from '../../assets/ratingsvglinks'
import { TableFavoriteIconSx } from '../../sxstyling/styles'
import './IndGameTable.css'

type IndGameTableProps = {
	multiResp: Explore[]
}

const TableCells = () => {
	return (
		<TableRow>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Title</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>IGDB Rating</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Release Date</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Platforms</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 100, color: '#ddd' }}>
				<h2 className='column-heading'>Age Ratings</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Genres</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Developers</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>Likes</h2>
			</TableCell>
			<TableCell align='center' sx={{ minWidth: 300, color: '#ddd' }}>
				<h2 className='column-heading'>IGDB Game ID</h2>
			</TableCell>
		</TableRow>
	)
}

const TableRows = ({ multiResp }: IndGameTableProps) => {
	return (
		<>
			{multiResp!.map((game: Explore) => (
				<TableRow key={game.id} sx={{ textAlign: 'center' }}>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<p className='title-link'>{game.title}</p>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<span className='avg-rating'>
							{game.rating.toFixed(2)}
						</span>
						<span className='max-rating'>
							&nbsp;/ 100 based on
						</span>
						<span className='num-rating'>
							&nbsp;{game.ratingCount}
						</span>
						&nbsp;
						<span className='max-rating'>
							reviews
						</span>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<p className='table-text'>{formattedDateLong(game.releaseDate)}</p>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						{game.platforms.map((val: Platforms) => (
							val.url ? <img key={val.id} className='card-platformlogo' alt={`${val.name} Logo`} src={val.url} /> : <></>
						))}
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<img className='card-logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === game.age_ratings.ESRB)[0] ? ESRB.filter((rating) => rating.IGDBRating === game.age_ratings.ESRB)[0].src : ESRB.filter((rating) => rating.IGDBRating === 7)[0].src} />
						<img className='card-logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === game.age_ratings.PEGI)[0] ? PEGI.filter((rating) => rating.IGDBRating === game.age_ratings.PEGI)[0].src : PEGI.filter((rating) => rating.IGDBRating === 7)[0].src} />
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<div className='genres-wrap'>
							{game.genres.map((val: GenericStringObj) => (
								<a key={val.id} className='tag-link-company'> {val.name}</a>
							))}
						</div>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<div className='companies-wrap'>
							{game.involved_companies.map((val: Companies) => (
								<a key={val.name} className='tag-company' href={val.officialSite} target='_blank'>
									<img className='companylogo' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
									<p>{val.name}</p>
								</a>
							))}
						</div>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<div>
							<SvgIcon sx={TableFavoriteIconSx} htmlColor='#d2042d' fontSize='large'>
								<FavoriteIcon/>
							</SvgIcon>
							<span className='avg-rating'>
								{game.likes}
							</span>
							<span className='like-text'>Like this game</span>
						</div>
					</TableCell>
					<TableCell align='center' sx={{ color: '#ddd' }}>
						<span className='avg-rating'>
							{game.id}
						</span>
					</TableCell>
				</TableRow>
			)
			)}
		</>
	)
}

const IndGameTable = ({ multiResp }: IndGameTableProps) => {
	return (
		<div className='marginTable'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 900, backgroundColor: '#1b1e22' }} aria-label='language table'>
					<TableHead>
						<TableCells/>
					</TableHead>
					<TableBody>
						<TableRows multiResp={multiResp} />
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export { IndGameTable }