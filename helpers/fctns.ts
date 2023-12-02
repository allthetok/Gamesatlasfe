/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosError, AxiosResponse } from 'axios'
import { LocalStorageObj, NestedSearchConfig, ProfilePrefSearchConfig, SimpleNullableSearchConfig, SimpleSearchConfig } from './fetypes'

const ratingFloatToStar = (rating: number) : number => rating / 20

const formattedDateLong = ((inpDate: string | Date) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' }))

const formattedYear = (inpDate: string | Date) => inpDate !== 'N/A' ? new Date(inpDate).getFullYear() : 'N/A'

const createExploreAxiosConfig = (method: string, endpoint: string, sortBy: string, sortDirection: string, platform: string, limit: string, genre: string) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
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

const createAdvancedAxiosConfig = (method: string, endpoint: string, sortBy: string, sortDirection: string, limit: string, platforms: string[], genres: string[], themes: string[], gameModes: string[], categories: string[], rating: number[], releaseDate: number[], companies: string[]) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'sortBy': sortBy,
			'sortDirection': sortDirection,
			'externalFilter': '',
			'nullable': 'age_ratings, follows, involved_companies, game_modes, category, total_rating',
			'limit': parseInt(limit),
			'platforms': platforms,
			'genres': genres,
			'themes': themes,
			'gameModes': gameModes,
			'categories': categories,
			'rating': rating,
			'releaseDate': releaseDate,
			'companies': companies
		}
	}
}


const createDeprecatedGameDtlConfig = (method: string, endpoint: string, searchTerm: string) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
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
		url: `http://localhost:5000/api/${endpoint}`,
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
		url: `http://localhost:5000/api/${endpoint}`,
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
		url: `http://localhost:5000/api/${endpoint}`,
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
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'gameid': gameid(gameID)
		}
	}
}

const createUserPrefSearchConfig = (method: string, endpoint: string, platforms: string[], genres: string[], themes: string[], gameModes: string[], nullable: string, limit: number, sortBy: string, sortDirection: string): ProfilePrefSearchConfig => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'sortBy': sortBy,
			'sortDirection': sortDirection,
			'nullable': nullable,
			'limit': limit,
			'platforms': platforms,
			'genres': genres,
			'themes': themes,
			'gameModes': gameModes,
		}
	}
}

const createUserRecommendConfig = (method: string, endpoint: string, userid: string) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'userid': Number(userid)
		}
	}
}

const createUserDetailsConfig = (method: string, endpoint: string, userid: string, profileid: string, provider: string) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'userid': Number(userid),
			'profileid': Number(profileid),
			'provider': provider
		}
	}
}

const createUserProfileConfig = (method: string, endpoint: string, userid: string, profileid: string) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'userid': Number(userid),
			'profileid': Number(profileid)
		}
	}
}

const createUserLikeConfig = (method: string, endpoint: string, userid: string, gameid: string | number, gameObj: any, similarObj: any | null) => {
	const gameObjExploreFormat = {
		id: gameObj.id,
		age_ratings: gameObj.age_ratings,
		cover: gameObj.cover,
		platforms: gameObj.platforms,
		rating: gameObj.rating,
		ratingCount: gameObj.ratingCount,
		releaseDate: gameObj.releaseDate,
		likes: gameObj.likes,
		title: gameObj.title,
		genres: gameObj.genres,
		involved_companies: gameObj.involved_companies,
	}

	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'userid': Number(userid),
			'gameid': Number(gameid),
			'gameExploreFormat': gameObjExploreFormat,
			'similarExploreFormat': similarObj
		}
	}
}

const createUserDeleteConfig = (method: string, endpoint: string, userid: string, gameid: string | number) => {
	return {
		method: method,
		url: `http://localhost:5000/api/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'userid': Number(userid),
			'gameid': Number(gameid)
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

const regexValidEmail = (email: string) => {
	const emailRegex = /\S+@\S+\.\S+/
	return emailRegex.test(email)
}

const likeGame = async (userid: string, gameid: string, gameObj: any, similarObj: any | null ) => {
	const userLikeConfig = createUserLikeConfig('post', 'userLike', userid, gameid, gameObj, similarObj)
	await axios(userLikeConfig)
		.then((response: AxiosResponse) => {
			return response.status === 200 ? { gameid: gameid, status: 'like' } : { gameid: gameid, status: 'nlike' }
		})
		.catch((err: AxiosError) => {
			console.log(err)
			return {
				gameid: gameid,
				status: 'nlike'
			}
		})
}

const deleteGame = async (userid: string, gameid: string) => {
	const userDeleteConfig = createUserDeleteConfig('delete', 'userLike', userid, gameid)
	await axios(userDeleteConfig)
		.then((response: AxiosResponse) => {
			return response.status === 200 ? { gameid: gameid, status: 'deleted' } : { gameid: gameid, status: 'fdeleted' }
		})
		.catch((err: AxiosError) => {
			console.log(err)
			return {
				gameid: gameid,
				status: 'fdeleted'
			}
		})
}


export { ratingFloatToStar, createUserDetailsConfig, createUserProfileConfig, formattedDateLong, formattedYear, createExploreAxiosConfig, createAdvancedAxiosConfig, createGameDtlConfig, createAuxiliaryConfig, createUserPrefSearchConfig, createUserRecommendConfig, retrieveLocalStorageObj, retrieveSearchTerm, splitRouteQuery, createDeprecatedNestedConfig, createDeprecatedGameDtlConfig, createInnerSearchConfig, searchtermToString, regexValidEmail, likeGame, deleteGame }


