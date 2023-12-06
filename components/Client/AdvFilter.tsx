/* eslint-disable no-case-declarations */
import React, { useState } from 'react'
import { yearMarks, platformButtonArray, searchButtonArray, genresButtonArray, ratingMarks, themesButtonArray, gameModesButtonArray, categoriesButtonArray } from '../../helpers/button'
import { AdvFilterContextObj } from '../../helpers/fetypes'
import { useAdvFilterContext } from '@/app/advfiltercontext'
import { Box, Button, IconButton, Slider } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import ClearIcon from '@mui/icons-material/Clear'
import DateRangeIcon from '@mui/icons-material/DateRange'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500'
import { CompanySearchList } from './CompanySearchList'
import { BoxActiveSx, BoxAdvActiveSx, BoxAdvNoBorderSx, BoxNoBorderSx, BoxRenderSx, ButtonActiveSx, ButtonAdvActiveSx, ButtonAdvSx, ButtonSx, OpacitySx } from '../../sxstyling/styles'
import './Advanced.css'

const AdvFilter = () => {
	const [searchTab, setSearchTab] = useState(searchButtonArray[0])
	const [companySearch, setCompanySearch] = useState('')

	const {
		dateYear, setDateYear,
		rating, setRating,
		platforms, setPlatforms,
		genres, setGenres,
		themes, setThemes,
		gameModes, setGameModes,
		categories, setCategories,
		companyList, setCompanyList
	}: AdvFilterContextObj = useAdvFilterContext()

	const handleDateChange = (e: Event, newDate: number | number[]) => {
		setDateYear(newDate as number[])
	}

	const handleRatingChange = (e: Event, newRating: number | number[]) => {
		setRating(newRating as number[])
	}

	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanySearch(e.target.value)
	}

	const handleClear = () => {
		setCompanySearch('')
	}

	const handleRemoveSpecific = (indFilter: string, specified: string): void => {
		switch (specified) {
		case 'platforms':
			const currentPlatforms = [...platforms].filter((platform: string) => platform !== indFilter)
			setPlatforms(currentPlatforms)
			break
		case 'genres':
			const currentGenres = [...genres].filter((genre: string) => genre !== indFilter)
			setThemes(currentGenres)
			break
		case 'themes':
			const currentThemes = [...themes].filter((theme: string) => theme !== indFilter)
			setThemes(currentThemes)
			break
		case 'gameModes':
			const currentGameModes = [...gameModes].filter((gameMode: string) => gameMode !== indFilter)
			setGameModes(currentGameModes)
			break
		case 'categories':
			const currentCategories = [...categories].filter((category: string) => category !== indFilter)
			setCategories(currentCategories)
			break
		case 'companyList':
			const currentCompanyList = [...companyList].filter((company: string) => company !== indFilter)
			setCompanyList(currentCompanyList)
			break
		default:
			return
		}
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
							<Box sx={platforms.includes(platform) ? BoxActiveSx : BoxNoBorderSx}>
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
					<Box sx={BoxRenderSx}>
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
					<Box sx={BoxRenderSx}>
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
							<Box sx={genres.includes(genre) ? BoxActiveSx : BoxNoBorderSx}>
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
							<Box sx={themes.includes(theme) ? BoxActiveSx : BoxNoBorderSx}>
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
							<Box sx={gameModes.includes(mode) ? BoxActiveSx : BoxNoBorderSx}>
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
							<Box sx={categories.includes(category) ? BoxActiveSx : BoxNoBorderSx}>
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
					<form className='search-company-bar'>
						<input type='text' className='search-bar-input' value={companySearch} onChange={handleChange} required placeholder='Search Companies...' />
						{companySearch !== '' ?
							<IconButton onClick={handleClear} size='medium'>
								<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={OpacitySx} />
							</IconButton>
							: <></>
						}
					</form>
					<CompanySearchList searchterm={companySearch} handleCompanyAdd={handleCompanyAdd} />
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
		<div className='adv-wrapper'>
			<ul className='adv-nav-tabs'>
				{searchButtonArray.map((el: string) => (
					<li className='adv-nav-tabs-li' key={el}>
						<Box sx={el === searchTab ? BoxAdvActiveSx : BoxAdvNoBorderSx} onClick={() => setSearchTab(el)}>
							<Button sx={el === searchTab ? ButtonAdvActiveSx : ButtonAdvSx}>
								{el}
							</Button>
						</Box>
					</li>
				))}
			</ul>
			<div>
				<div className='filter-select-wrap'>
					{SwitchRender(searchTab)}
					<div className='current-filter-wrap'>
						<div className='editable-wrap'>
							<></>
							{platforms.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{platforms.map((platform: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(platform, 'platforms',)}>
												{platform}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
							{genres.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{genres.map((genre: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(genre, 'genres')}>
												{genre}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
							{themes.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{themes.map((theme: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(theme, 'themes')}>
												{theme}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
							{gameModes.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{gameModes.map((gameMode: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(gameMode, 'gameModes')}>
												{gameMode}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
							{categories.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{categories.map((category: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(category, 'categories')}>
												{category}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
							{companyList.length !== 0 ?
								<div>
									<ul className='filter-selected-buttons'>
										{companyList.map((company: string, index: number) => (
											<li className='tag-link-filter' key={index} onClick={() => handleRemoveSpecific(company, 'companyList')}>
												{company}
												<IconButton size='medium'>
													<ClearIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
												</IconButton>
											</li>
										))}
									</ul>
								</div>
								: <></>
							}
						</div>
						<div className='editable-wrap'>
							<div>
								<ul className='filter-selected-buttons'>
									<li className='tag-link-filter' key='releaseDate' onClick={() => setSearchTab('Release Date')}>
										{dateYear[0]} - {dateYear[1]}
										<IconButton size='medium'>
											<DateRangeIcon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
										</IconButton>
									</li>
									<li className='tag-link-filter' key='rating' onClick={() => setSearchTab('Rating')}>
										{rating[0]} - {rating[1]}
										<IconButton size='medium'>
											<StarBorderPurple500Icon fontSize='medium' htmlColor='#ddd' sx={OpacitySx} />
										</IconButton>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { AdvFilter }