import React, { useState } from 'react'
import { yearMarks, platformButtonArray, searchButtonArray, genresButtonArray, ratingMarks, themesButtonArray, gameModesButtonArray, categoriesButtonArray } from '../../helpers/button'
import { Box, Button, IconButton, Slider } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import ClearIcon from '@mui/icons-material/Clear'
import { Search } from './Search'
import { AdvCSearchList } from './AdvCSearchList'
import { BoxActiveSx, BoxAdvActiveSx, BoxAdvSx, BoxSx, ButtonActiveSx, ButtonAdvActiveSx, ButtonAdvSx, ButtonSx } from '../../sxstyling/styles'
import './Advanced.css'


const Advanced = () => {
	const [searchTab, setSearchTab] = useState(searchButtonArray[0])

	const [dateYear, setDateYear] = useState<number[]>([2022,2023])
	const [rating, setRating] = useState<number[]>([0,100])
	const [platforms, setPlatforms] = useState<string[]>([])
	const [genres, setGenres] = useState<string[]>([])
	const [themes, setThemes] = useState<string[]>([])
	const [gameModes, setGameModes] = useState<string[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [companySearch, setCompanySearch] = useState('')
	const [companyList, setCompanyList] = useState<string[]>([])

	const handleDateChange = (e: Event, newDate: number | number[]) => {
		setDateYear(newDate as number[])
	}

	const handleRatingChange = (e: Event, newRating: number | number[]) => {
		setRating(newRating as number[])
	}

	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanySearch(e.target.value)
	}

	// const handleClear = (e: React.MouseEvent<HTMLElement>) => {
	// 	setCompanySearch('')
	// }
	const handleClear = () => {
		setCompanySearch('')
	}

	const handleRemove = (companyInList: string) => {
		const currentCompanies = [...companyList].filter((indCompany: string) => indCompany !== companyInList)
		setCompanyList(currentCompanies)
	}

	const handleCompanyAdd = (companySuggest: string) => {
		const currentCompanies = [...companyList]
		currentCompanies.push(companySuggest)
		setCompanyList(currentCompanies)
		handleClear()
	}


	const SwitchRender = (currentTab: string) => {
		switch(currentTab) {
		case 'Platforms':
			return (
				<ul className='adv-nav-tabs'>
					{platformButtonArray.map((platform: string) => (
						<li className={platforms.includes(platform) ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={platform}>
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
				<ul className='adv-nav-tabs-grid'>
					{genresButtonArray.map((genre: string) => (
						<li className={genres.includes(genre) ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={genre}>
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
			)
		case 'Themes':
			return (
				<ul className='adv-nav-tabs-grid'>
					{themesButtonArray.map((theme: string) => (
						<li className={themes.includes(theme) ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={theme}>
							<Box sx={themes.includes(theme) ? BoxActiveSx : BoxSx}>
								<Button sx={themes.includes(theme) ? ButtonActiveSx : ButtonSx} onClick={() => {
									const currentThemes = [...themes]
									currentThemes.push(theme)
									setThemes(currentThemes)
								}}>
									{theme}
								</Button>
							</Box>
						</li>
					))}
				</ul>
			)
		case 'Game Modes':
			return (
				<ul className='adv-nav-tabs'>
					{gameModesButtonArray.map((mode: string) => (
						<li className={gameModes.includes(mode) ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={mode}>
							<Box sx={gameModes.includes(mode) ? BoxActiveSx : BoxSx}>
								<Button sx={gameModes.includes(mode) ? ButtonActiveSx : ButtonSx} onClick={() => {
									const currentGameModes = [...gameModes]
									currentGameModes.push(mode)
									setGameModes(currentGameModes)
								}}>
									{mode}
								</Button>
							</Box>
						</li>
					))}
				</ul>
			)
		case 'Category':
			return (
				<ul className='adv-nav-tabs'>
					{categoriesButtonArray.map((category: string) => (
						<li className={categories.includes(category) ? 'adv-nav-tabs-li-active' : 'adv-nav-tabs-li'} key={category}>
							<Box sx={categories.includes(category) ? BoxActiveSx : BoxSx}>
								<Button sx={categories.includes(category) ? ButtonActiveSx : ButtonSx} onClick={() => {
									const currentCategories = [...categories]
									currentCategories.push(category)
									setCategories(currentCategories)
								}}>
									{category}
								</Button>
							</Box>
						</li>
					))}
				</ul>
			)
		case 'Companies':
			return (
				<div>
					<div className='search-company-wrap'>
						<form className='search-company-bar'>
							<input type='text' className='search-bar-input' value={companySearch} onChange={handleChange} required placeholder='Search Companies...' />
							{companySearch !== '' ?
								<IconButton onClick={handleClear} size='medium'>
									<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={{ opacity: '0.9' }} />
								</IconButton>
								: <></>
							}
						</form>
						<div className='company-selected'>
							<ul className='company-selected-buttons'>
								{companyList.map((company: string) => (
									<li className='tag-link-company' key={company}>
										{company}
										<IconButton onClick={() => handleRemove(company)} size='medium'>
											<ClearIcon fontSize='medium' htmlColor='#ddd' sx={{ opacity: '0.9' }} />
										</IconButton>
									</li>
								))}
							</ul>
						</div>
					</div>
					<AdvCSearchList searchterm={companySearch} handleCompanyAdd={handleCompanyAdd} />
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