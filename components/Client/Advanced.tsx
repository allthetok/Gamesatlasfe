import React, { useState } from 'react'
import { Search } from './Search'
import { yearMarks, platformButtonArray, searchButtonArray, genresButtonArray, ratingMarks } from '../../helpers/button'
import { Box, Button, Slider } from '@mui/material'
import { BoxActiveSx, BoxAdvActiveSx, BoxAdvSx, BoxSx, ButtonActiveSx, ButtonAdvActiveSx, ButtonAdvSx, ButtonSx } from '../../sxstyling/styles'
import './Advanced.css'


const Advanced = () => {
	const [searchTab, setSearchTab] = useState(searchButtonArray[0])

	const [dateYear, setDateYear] = useState<number[]>([2022,2023])
	const [rating, setRating] = useState<number[]>([0,100])
	const [platforms, setPlatforms] = useState<string[]>([])
	const [genres, setGenres] = useState<string[]>([])

	const handleDateChange = (e: Event, newDate: number | number[]) => {
		setDateYear(newDate as number[])
	}

	const handleRatingChange = (e: Event, newRating: number | number[]) => {
		setRating(newRating as number[])
	}

	const addPlatform = (e: Event, platform: string) => {
		const currentPlatforms = [...platforms]
		currentPlatforms.push(platform)
		setPlatforms(currentPlatforms)
	}

	const addGenre = (genre: string) => {
		const currentGenres = [...genres]
		currentGenres.push(genre)
		setGenres(currentGenres)
	}

	const SwitchRender = (currentTab: string) => {
		switch(currentTab) {
		case 'Platforms':
			return (
				<ul className='adv-nav-tabs'>
					{platformButtonArray.map((platform: string) => (
						<li className='adv-nav-tabs-li' key={platform}>
							<Box sx={platforms.includes(platform) ? BoxActiveSx : BoxSx}>
								<Button sx={platforms.includes(platform) ? ButtonActiveSx : ButtonSx} onClick={() => {
									const currentPlatforms = [...platforms]
									currentPlatforms.push(platform)
									setPlatforms(currentPlatforms)
								}}>
									{platform}
								</Button>
							</Box>
						</li>
					))}
				</ul>
			)
		case 'Release Date':
			return (
				<div>
					<Box sx={{ width: 750 }}>
						<Slider
							value={dateYear}
							onChange={handleDateChange}
							valueLabelDisplay='auto'
							getAriaValueText={(dateYear: number) => dateYear.toString()}
							min={1972}
							step={1}
							size='medium'
							marks={yearMarks}
							max={2023}
							color='primary'
						/>
					</Box>
				</div>
			)
		case 'Rating':
			return (
				<div>
					<Box sx={{ width: 750 }}>
						<Slider
							value={rating}
							onChange={handleRatingChange}
							valueLabelDisplay='auto'
							getAriaValueText={(rate: number) => rate.toString()}
							min={0}
							step={5}
							size='medium'
							marks={ratingMarks}
							max={100}
							color='primary'
						/>
					</Box>
				</div>
			)
		case 'Genres':
			return (
				<div className='genre-rows'>
					{/* <ul className='adv-nav-tabs-genre'>
						{genresButtonArray.map((genre: string) => (
							<li className='adv-nav-tabs-li' key={genre}>
								<Box sx={genres.includes(genre) ? BoxActiveSx : BoxSx}>
									<Button sx={genres.includes(genre) ? ButtonActiveSx : ButtonSx} onClick={() => {
										const currentGenres = [...genres]
										currentGenres.push(genre)
										setGenres(currentGenres)
									}}>
										{genre}
									</Button>
								</Box>
							</li>
						))}
					</ul> */}
					<ul className='adv-nav-tabs-genre'>
						{genresButtonArray.slice(0,10).map((genre: string) => (
							<li className='adv-nav-tabs-li' key={genre}>
								<Box sx={genres.includes(genre) ? BoxActiveSx : BoxSx}>
									<Button sx={genres.includes(genre) ? ButtonActiveSx : ButtonSx} onClick={() => {
										const currentGenres = [...genres]
										currentGenres.push(genre)
										setGenres(currentGenres)
									}}>
										{genre}
									</Button>
								</Box>
							</li>
						))}
					</ul>
					<ul className='adv-nav-tabs-genre'>
						{genresButtonArray.slice(10,20).map((genre: string) => (
							<li className='adv-nav-tabs-li' key={genre}>
								<Box sx={genres.includes(genre) ? BoxActiveSx : BoxSx}>
									<Button sx={genres.includes(genre) ? ButtonActiveSx : ButtonSx} onClick={() => {
										const currentGenres = [...genres]
										currentGenres.push(genre)
										setGenres(currentGenres)
									}}>
										{genre}
									</Button>
								</Box>
							</li>
						))}
					</ul>
					<ul className='adv-nav-tabs-genre'>
						{genresButtonArray.slice(20,genresButtonArray.length).map((genre: string) => (
							<li className='adv-nav-tabs-li' key={genre}>
								<Box sx={genres.includes(genre) ? BoxActiveSx : BoxSx}>
									<Button sx={genres.includes(genre) ? ButtonActiveSx : ButtonSx} onClick={() => {
										const currentGenres = [...genres]
										currentGenres.push(genre)
										setGenres(currentGenres)
									}}>
										{genre}
									</Button>
								</Box>
							</li>
						))}
					</ul>
				</div>
			)
		default:
			return (
				<div>
					None
				</div>
			)
		}
	}

	return (
		<>
			<Search/>
			<div className='adv-wrapper'>
				<h2>Advanced Search</h2>
				<ul className='adv-nav-tabs'>
					{searchButtonArray.map((el: string) => (
						<li className='adv-nav-tabs-li' key={el}>
							<Box sx={el === searchTab ? BoxAdvActiveSx : BoxAdvSx} onClick={() => setSearchTab(el)}>
								<Button sx={el === searchTab ? ButtonAdvActiveSx : ButtonAdvSx}>
									{el}
								</Button>
							</Box>
						</li>
					))}
				</ul>
				{SwitchRender(searchTab)}
			</div>
		</>
	)
}

export { Advanced }