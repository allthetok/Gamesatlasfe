/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { AgeRatings, Categories, Companies, GameObj, GlobalAuxiliaryObj, Platforms } from '../../../backendga/helpers/betypes'
import { useGameContext } from '@/app/gamecontext'
import { AuxiliaryObj, GameContextObj, GenericStringObj, LocalStorageObj, OverviewObj } from '../../helpers/fetypes'
import { createGameDtlConfig, retrieveLocalStorageObj, retrieveSearchTerm, searchtermToString } from '../../helpers/fctns'
import { ESRB, PEGI, ExternalCategories, WebsiteCategories, placeholderImages } from '../../assets/ratingsvglinks'
import { Description } from '../Client/Description'
import { Search } from '../Client/Search'
import { NavGame } from '../Server/NavGame'
import { Overview } from './Overview'
import './GameDtl.css'

type GameDtlProps = {
	dataFetch: GameObj
}

const GameDtl = ({ dataFetch }: GameDtlProps) => {

	const auxiliaryObj: LocalStorageObj = {
		gameID: dataFetch.id,
		title: dataFetch.title,
		involved_companies: dataFetch.involved_companies.map((company: Companies) => company.name).join(', '),
		summary: dataFetch.summary,
		story: dataFetch.story,
		releaseDate: dataFetch.releaseDate
	}

	const getPlatformCompanies = (platformsArr: Platforms[] | Companies[]): React.JSX.Element => {
		return (
			<>
				{platformsArr.map((val: Platforms | Companies) => (
					<div className='platforms' key={val.name}>
						<img className='logo' alt='Logo of Company' src={val.url} />
						<p className='ptext'>{val.name}</p>
					</div>
				))}
			</>
		)
	}

	const getAgeRatings = (ratingsObj: AgeRatings): React.JSX.Element => {
		return (
			<>
				<div className='platforms'>
					<img className='logo' alt='ESRB Rating' src={ESRB.filter((rating) => rating.IGDBRating === ratingsObj.ESRB)[0].src} />
					<p className='ptext'>ESRB Rating</p>
				</div>
				<div className='platforms'>
					<img className='logo' alt='PEGI Rating' src={PEGI.filter((rating) => rating.IGDBRating === ratingsObj.PEGI)[0].src} />
					<p className='ptext'>PEGI Rating</p>
				</div>
			</>
		)
	}

	const getGenericArr = (stringArr: GenericStringObj[]): React.JSX.Element => {
		return (
			<>
				{stringArr.map((val: GenericStringObj) => (
					<div key={val.id}>
						<a href=''>{val.name}</a>
					</div>
				))}
			</>
		)
	}

	const getStringArr = (stringArr: string[]): React.JSX.Element => {
		return (
			<>
				{stringArr.map((val: string) => (
					<div key={val}>
						<a href=''>{val}</a>
					</div>
				))}
			</>
		)
	}

	const getWebsites = (categoriesArr: Categories[], specified: string): React.JSX.Element => {
		return specified === 'External' ?
			(
				<>
					{categoriesArr.map((el: Categories) => (
						<div key={el.category}>
							<p className='max-rating smallmargin'>
								{ExternalCategories.filter((field) => field.source === el.category)[0].category}
								<img className='logo pad-left' alt={`${ExternalCategories.filter((field) => field.source === el.category)[0].category}`} src={`${ExternalCategories.filter((field) => field.source === el.category)[0].src}`} />
							</p>
							<a href={el.url} target='_blank' rel='noreferrer'>Visit
								<img className='link-external' alt='Open Website' src={placeholderImages.LinkButtons}/>
							</a>
						</div>
					))}
				</>
			) :
			(
				<>
					{categoriesArr.map((el: Categories) => (
						<div key={el.category}>
							<p className='max-rating smallmargin'>
								{WebsiteCategories.filter((field) => field.source === el.category)[0].category}
								<img className='logo pad-left' alt={`${WebsiteCategories.filter((field) => field.source === el.category)[0].category}`} src={`${WebsiteCategories.filter((field) => field.source === el.category)[0].src}`} />
							</p>
							<a href={el.url} target='_blank' rel='noreferrer'>Visit{/* </a> <a href={el.url} className='link-external'> */}
								<img className='link-external' alt='Open Website' src={placeholderImages.LinkButtons}/>
							</a>
						</div>
					))}
				</>
			)
	}

	return (
		<div>
			<Search />
			<div className='header-wrapper'>
				<NavGame title={dataFetch.title} gameID={dataFetch.id} searchterm={searchtermToString(useRouter().query.searchterm!)}/>
				<Overview dataFetch={dataFetch} getPlatformCompanies={getPlatformCompanies} getAgeRatings={getAgeRatings} getGenericArr={getGenericArr} getStringArr={getStringArr} getWebsites={getWebsites}/>
				<Description auxiliaryObj={auxiliaryObj} />
			</div>
		</div>
	)
}

export default GameDtl