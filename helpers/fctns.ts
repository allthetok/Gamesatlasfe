/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LocalStorageObj } from './fetypes'

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

const createGameDtlConfig = (method: string, endpoint: string, searchTerm: string) => {
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

// const retrieveLocalStorageObj = (): LocalStorageObj => {
// 	if (typeof window !== 'undefined'){
// 		const localstorageObj =  JSON.parse(localStorage.getItem('auxiliaryObj')!)
// 		// console.log(JSON.parse(localstorageObj!))
// 		// return JSON.parse(localstorageObj!)
// 		return localstorageObj
// 	}
// 	else {
// 		return {
// 			gameID: 0,
// 			title: 'None',
// 			involved_companies: '',
// 			summary: '',
// 			story: '',
// 			releaseDate: ''
// 		}
// 	}
// }

const retrieveLocalStorageObj = (gameDtl: boolean): LocalStorageObj => typeof window !== 'undefined' && !gameDtl ? JSON.parse(localStorage.getItem('auxiliaryObj')!) : { gameID: 0, title: '', involved_companies: '', summary: '', story: '', releaseDate: '' }

export { ratingFloatToStar, formattedDateLong, formattedYear, createExploreAxiosConfig, createGameDtlConfig, createAuxiliaryConfig, retrieveLocalStorageObj }


