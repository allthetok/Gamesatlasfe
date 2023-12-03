/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useLikes } from '../../hooks/useLikes'
import ReactLoading from 'react-loading'
import { AgeRatings, Companies, Explore, Platforms } from '../../../backendga/helpers/betypes'
import { GenericStringObj } from '../../helpers/fetypes'
import { deleteGame, formattedDateLong, likeGame } from '../../helpers/fctns'
import { TableRow, TableCell, TableContainer, Paper, Table, TableHead, TableBody, SvgIcon } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { ESRB, PEGI, placeholderImages } from '../../assets/ratingsvglinks'
import { TableFavoriteIconSx } from '../../sxstyling/styles'
import './IndGameTable.css'

type IndGameTableProps = {
	multiResp: Explore[]
}

type IndGameProps = {
	id: number | null,
	cover: string | null,
	platforms: Platforms[],
	rating: number,
	ratingCount: number | null,
	age_ratings: AgeRatings,
	releaseDate: string | Date,
	likes: number | null,
	title: string,
	genres: GenericStringObj[],
	companies: Companies[],
	liked: boolean
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

const IndGameRow = ({ id, cover, platforms, rating, ratingCount, age_ratings, releaseDate, likes, title, genres, companies, liked } : IndGameProps) => {
	const data = useSession()
	const router = useRouter()
	const [userId, setUserId] = useState<string|null>(null)
	const [gameLiked, setGameLiked] = useState(liked)

	useEffect(() => {
		if (data.status === 'authenticated') {
			setUserId(data.data.user.id)
		}
	}, [data])

	const handleLikeClick = async () => {
		if (userId === null) {
			router.push('/signin')
		}
		else {
			const gameObj = {
				id: id,
				age_ratings: age_ratings,
				cover: cover,
				platforms: platforms,
				rating: rating,
				ratingCount: ratingCount,
				releaseDate: releaseDate,
				likes: likes,
				title: title,
				genres: genres,
				involved_companies: companies
			}
			const returnResult = await likeGame(userId!, String(id), gameObj, null)
			setGameLiked(returnResult.status === 'like')
		}
	}

	const handleDeleteClick = async () => {
		if (userId === null) {
			router.push('/signin')
		}
		else {
			const returnResult = await deleteGame(userId!, String(id))
			console.log(returnResult)
			setGameLiked(returnResult.status !== 'deleted')
		}
	}

	return (
		<TableRow key={id} sx={{ textAlign: 'center' }}>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<Link href={`/game/${title}`} className='title-nostyle'>
					<p className='title-link'>{title}</p>
				</Link>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<span className='avg-rating'>
					{rating.toFixed(2)}
				</span>
				<span className='max-rating'>
							&nbsp;/ 100 based on
				</span>
				<span className='num-rating'>
							&nbsp;{ratingCount}
				</span>
						&nbsp;
				<span className='max-rating'>
							reviews
				</span>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<p className='table-text'>{formattedDateLong(releaseDate)}</p>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				{platforms.map((val: Platforms) => (
					val.url ? <img key={val.id} className='card-platformlogo' alt={`${val.name} Logo`} src={val.url} /> : <></>
				))}
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<img className='card-logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0] ? ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0].src : ESRB.filter((rating) => rating.IGDBRating === 7)[0].src} />
				<img className='card-logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0] ? PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0].src : PEGI.filter((rating) => rating.IGDBRating === 7)[0].src} />
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<div className='genres-wrap'>
					{genres.map((val: GenericStringObj) => (
						<a key={val.id} className='tag-link-company'> {val.name}</a>
					))}
				</div>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<div className='companies-wrap'>
					{companies.map((val: Companies) => (
						<a key={val.name} className='tag-company' href={val.officialSite} target='_blank'>
							<img className='companylogo' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
							<p>{val.name}</p>
						</a>
					))}
				</div>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<div>
					{!gameLiked ?
						<SvgIcon sx={TableFavoriteIconSx} htmlColor='#d2042d' fontSize='large' onClick={handleLikeClick}>
							<FavoriteIcon/>
						</SvgIcon>
						: <SvgIcon sx={TableFavoriteIconSx} htmlColor='#6d7e86' fontSize='large' onClick={handleDeleteClick}>
							<DeleteIcon/>
						</SvgIcon>
					}
					<span className='avg-rating'>
						{likes}
					</span>
					<span className='like-text'>Like this game</span>
				</div>
			</TableCell>
			<TableCell align='center' sx={{ color: '#ddd' }}>
				<span className='avg-rating'>
					{id}
				</span>
			</TableCell>
		</TableRow>
	)

}

const TableRows = ({ multiResp }: IndGameTableProps) => {
	const data = useSession()
	const { likeDataFetch, loading } = useLikes(data.data?.user.id | null)

	return (
		<>
			{!loading ?
				<>
					{multiResp.map((game: Explore) => (
						<IndGameRow key={game.id} id={game.id} cover={game.cover} platforms={game.platforms} rating={game.rating} ratingCount={game.ratingCount} age_ratings={game.age_ratings} releaseDate={game.releaseDate} likes={game.likes} title={game.title} genres={game.genres} companies={game.involved_companies} liked={likeDataFetch.length !== 0 ? likeDataFetch.map((item: any) => item.gameobj).filter((resp: any) => resp.id === game.id).length !== 0 : false} />
					))}
				</>
				: <ReactLoading type={'spinningBubbles'} color={'#ddd'} height={150} width={150} />
			}
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