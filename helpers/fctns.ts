/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LocalStorageObj, NestedSearchConfig, SimpleNullableSearchConfig, SimpleSearchConfig } from './fetypes'

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
			'externalFilter': 'total_rating_count > 5 & category=(0,1,2,4,5,8,9)',
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

const createDeprecatedNestedConfig = (method: string, endpoint: string, gameid: number) => {
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

const createGameDtlConfig = (method: string, endpoint: string, searchTerm: string | string[]): SimpleSearchConfig => {
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

const createInnerSearchConfig = (method: string, endpoint: string, searchTerm: string | string[], nullable: string): SimpleNullableSearchConfig => {
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
			'searchterm': searchterm(searchTerm),
			'nullable': nullable
		}
	}
}

const createAuxiliaryConfig = (method: string, endpoint: string, gameID: string | string[]): NestedSearchConfig => {
	const gameid = (gameID: string | string[]) => {
		if (typeof gameID !== 'string') {
			return Number(gameID.join(''))
		}
		else {
			return Number(gameID)
		}
	}
	return {
		method: method,
		url: `http://localhost:3001/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameid(gameID)
		}
	}
}

const retrieveLocalStorageObj = (gameDtl: boolean): LocalStorageObj => typeof window !== 'undefined' && !gameDtl ? JSON.parse(localStorage.getItem('auxiliaryObj')!) : { gameID: 0, title: '', involved_companies: '', summary: '', story: '', releaseDate: '' }

const retrieveSearchTerm = (): string => typeof window !== 'undefined' ? localStorage.getItem('searchterm') || '' : ''

const splitRouteQuery = (inputStr: string, separator: string) => {
	const result = inputStr.substring(inputStr.lastIndexOf(separator)+1)
	return result !== inputStr ? result : ''
}


const searchtermToString = (searchterm: string | string[]) => typeof searchterm !== 'string' ? searchterm.join('') : searchterm


export { ratingFloatToStar, formattedDateLong, formattedYear, createExploreAxiosConfig, createGameDtlConfig, createAuxiliaryConfig, retrieveLocalStorageObj, retrieveSearchTerm, splitRouteQuery, createDeprecatedNestedConfig, createDeprecatedGameDtlConfig, createInnerSearchConfig, searchtermToString }


