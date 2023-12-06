/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { deleteGame, formattedYear, likeGame } from '../../helpers/fctns'
import { GenericStringObj, AgeRatings, Companies, Platforms } from '../../helpers/fetypes'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import { SvgIcon } from '@mui/material'
import { ESRB, PEGI, placeholderImages } from '../../assets/ratingsvglinks'
import { IconSx } from '../../sxstyling/styles'
import './IndGame.css'

type IndGameProps = {
	id: number | null,
	cover: string,
	platforms: Platforms[],
	rating: number,
	age_ratings: AgeRatings,
	releaseDate: string | Date,
	likes: number,
	title: string,
	genres: GenericStringObj[],
	companies: Companies[],
	liked: boolean
}

const IndGame = ({ id, cover, platforms, rating, age_ratings, releaseDate, likes, title, genres, companies, liked } : IndGameProps) => {
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
				ratingCount: 0,
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
			setGameLiked(returnResult.status !== 'deleted')
		}
	}


	return (
		<div>
			<div className='ind-wrapper'>
				<div className='card-game'>
					<img className='card-img' src={cover!} />
					<div className='card-body'>
						<div className='card-stack'>
							<div className='card-platforms'>
								{platforms.map((val: Platforms) => (
									<img key={val.id} className='card-platformlogo' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />
								))}
							</div>
							<span className='card-rating'>{Math.round(rating)}</span>
						</div>
						<div className='card-stack'>
							<div className='card-platforms'>
								<img className='card-logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0] ? ESRB.filter((rating) => rating.IGDBRating === age_ratings.ESRB)[0].src : ESRB.filter((rating) => rating.IGDBRating === 7)[0].src} />
								<img className='card-logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0] ? PEGI.filter((rating) => rating.IGDBRating === age_ratings.PEGI)[0].src : PEGI.filter((rating) => rating.IGDBRating === 7)[0].src} />
							</div>
							<span className='card-year'>{formattedYear(releaseDate)}</span>
						</div>
						<div className='card-likesstack'>
							<div className='card-heart'>
								{!gameLiked ?
									<SvgIcon sx={IconSx} htmlColor='#d2042d' fontSize='large' onClick={handleLikeClick}>
										<FavoriteIcon/>
									</SvgIcon>
									: <SvgIcon sx={IconSx} htmlColor='#6d7e86' fontSize='large' onClick={handleDeleteClick}>
										<DeleteIcon/>
									</SvgIcon>
								}
								<span className='like-text'>{gameLiked ? 'Delete like' : 'Like this game'}</span>
							</div>
							<span className='card-likes'>{likes}</span>
						</div>
						<Link href={`/game/${title}`} className='title-nostyle'>
							<h2 className='card-heading'>
								{title}
							</h2>
						</Link>
						<div className='card-companies'>
							{genres.map((val: GenericStringObj) => (
								<a key={val.id} className='tag-link-company'> {val.name}</a>
							))}
							{companies?.map((val: Companies) => (
								<a key={val.name} className='tag-link-company' href={val.officialSite} target='_blank'> {val.name} </a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { IndGame }