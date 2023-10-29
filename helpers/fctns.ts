/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LocalStorageObj, SimpleSearchConfig } from './fetypes'

const ratingFloatToStar = (rating: number) : number => rating / 20

const formattedDateLong = ((inpDate: string | Date) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' }))

const formattedYear = (inpDate: string | Date) => inpDate !== 'N/A' ? new Date(inpDate).getFullYear() : 'N/A'

const createExploreAxiosConfig = (method: string, endpoint: string, sortBy: string, sortDirection: string, platform: string, limit: string, genre: string) => {
	return {
		method: method,
		url: `http://localhost:3001/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'sortBy': sortBy,
			'sortDirection': sortDirection,
			'externalFilter': 'total_rating_count > 5',
			'nullable': 'age_ratings, follows, involved_companies, involved_companies.developer',
			'platformFamily': platform,
			'limit': parseInt(limit),
			'genres': genre
		}
	}
}

const createDeprecatedGameDtlConfig = (method: string, endpoint: string, searchTerm: string) => {
	return {
		method: method,
		url: `http://localhost:3001/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'searchterm': searchTerm
		}
	}
}

const createGameDtlConfig = (method: string, endpoint: string, searchTerm: string | string[]): SimpleSearchConfig => {
	if (typeof searchTerm !== 'string') {
		searchTerm = searchTerm.join('')
	}
	const searchterm = (searchTerm: string | string[]) => {
		if (typeof searchTerm !== 'string') {
			return searchTerm.join('')
		}
		else {
			return searchTerm
		}
	}
	return {
		method: method,
		url: `http://localhost:3001/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'searchterm': searchterm(searchTerm)
		}
	}
}

const createAuxiliaryConfig = (method: string, endpoint: string, gameid: number) => {
	return {
		method: method,
		url: `http://localhost:3001/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameid
		}
	}
}

const retrieveLocalStorageObj = (gameDtl: boolean): LocalStorageObj => typeof window !== 'undefined' && !gameDtl ? JSON.parse(localStorage.getItem('auxiliaryObj')!) : { gameID: 0, title: '', involved_companies: '', summary: '', story: '', releaseDate: '' }

const retrieveSearchTerm = (): string => typeof window !== 'undefined' ? localStorage.getItem('searchterm') || '' : ''

const splitRouteQuery = (inputStr: string, separator: string) => {
	const result = inputStr.substring(inputStr.lastIndexOf(separator)+1)
	return result !== inputStr ? result : ''
}

export { ratingFloatToStar, formattedDateLong, formattedYear, createExploreAxiosConfig, createGameDtlConfig, createAuxiliaryConfig, retrieveLocalStorageObj, retrieveSearchTerm, splitRouteQuery }


