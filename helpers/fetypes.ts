import { AgeRatings, Categories, Companies, Covers, Languages, Platforms, Videos } from '../../backendga/helpers/betypes'

type ButtonField = {
	link: string,
	formatName: string
}

type LanguageTable = {
	language: string,
	locale: string,
	native: string,
	language_support_types: string[]
}

type GameDetailObj = {
	id: number | null,
	age_ratings: AgeRatings,
	artworks: string[],
	cover: string | undefined,
	external_games: Categories[],
	game_modes: string[],
	genres: string[],
	hypes: number | null,
	involved_companies: Companies[],
	keywords: string[],
	platforms: Platforms[],
	player_perspectives: string[],
	screenshots: string[],
	similar_games: Covers[],
	tags: string,
	themes: string[],
	videos: Videos[],
	websites: Categories[],
	language_supports: Languages[],
	game_localizations: string,
	rating: number,
	ratingCount: number | null,
	releaseDate:  string,
	likes: number | null,
	title: string,
	story: string,
	summary: string,
	url: string
}

type OverviewObj = {
	id: number | null,
	age_ratings: AgeRatings,
	cover: string | undefined,
	external_games: Categories[],
	game_modes: string[],
	genres: string[],
	hypes: number | null,
	involved_companies: Companies[],
	keywords: string[],
	platforms: Platforms[],
	player_perspectives: string[],
	tags: string,
	themes: string[],
	websites: Categories[],
	game_localizations: string,
	rating: number,
	ratingCount: number | null,
	releaseDate: string,
	likes: number | null,
	title: string,
	story: string,
	summary: string,
	url: string
}

type ArtworkObj = {
	artworks: string[]
}

type LanguageObj = {
	language_supports: Languages[]
}

type ScreenshotsObj = {
	screenshots: string[],
}

type SimilarObj = {
	similar_games: Covers[],
}

type VideoObj = {
	videos: Videos[],
}

type WebsiteObj = {
	websites: Categories[],
}

type AuxiliaryObj = {
	// gameID: number,
	title: string,
	involved_companies: string,
	summary: string,
	story: string,
	releaseDate: string
}

type LocalStorageObj = {
	gameID: number,
	title: string,
	involved_companies: string,
	summary: string,
	story: string,
	releaseDate: string | Date
}

type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

type MultiObj = {
	id: number,
	age_ratings: AgeRatings,
	cover: string,
	platforms: {id: number, category: number, name: string, platform_logo: number | null | undefined, url: string}[],
	rating: number,
	ratingCount: number,
	releaseDate: string,
	likes: number,
	title: string
}

type GenericStringObj = {
	id: number,
	name: string
}

interface SimpleSearchConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		searchterm: string
	}
}

interface SimpleNullableSearchConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		searchterm: string,
		nullable: string
	}
}

interface NestedSearchConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		gameid: number
	}
}

interface ProfilePrefSearchConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		sortBy: string,
		sortDirection: string,
		nullable: string,
		limit: number,
		platforms: string[],
		genres: string[],
		themes: string[],
		gameModes: string[],
	}
}

interface SearchResultsObj {
	id: number,
	category: string,
	cover: string,
	releaseDate: string,
	likes: number,
	involved_companies: Companies[],
	title: string,
	platforms: Platforms[],
	rating: number
}

interface FilterContextObj {
	sortBy: string, setSortBy: (sortBy: string) => void,
	sortDirection: string, setSortDirection: (sortDirection: string) => void,
	platform: string, setPlatform: (platform: string) => void,
	limit: string, setLimit: (limit: string) => void,
	genre: string, setGenre: (genre: string) => void,
	viewToggle: string, setViewToggle: (viewToggle: string) => void,
}

interface AdvFilterContextObj {
	dateYear: number[], setDateYear: (dateYear: number[]) => void,
	rating: number[], setRating: (rating: number[]) => void,
	platforms: string[], setPlatforms: (platforms: string[]) => void,
	genres: string[], setGenres: (genres: string[]) => void,
	themes: string[], setThemes: (themes: string[]) => void,
	gameModes: string[], setGameModes: (gameModes: string[]) => void,
	categories: string[], setCategories: (categories: string[]) => void,
	companyList: string[], setCompanyList: (companyList: string[]) => void
}

interface ExploreConfigData {
	sortBy: string,
	sortDirection: string,
	externalFilter: string,
	nullable: string,
	platformFamily: string,
	limit: number,
	genres: string
}

interface AdvancedConfigData {
	sortBy: string,
	sortDirection: string,
	externalFilter: string,
	nullable: string,
	limit: number,
	platforms: string[],
	genres: string[],
	themes: string[],
	gameModes: string[],
	categories: string[],
	rating: number[],
	releaseDate: number[],
	companies: string[]
}

interface AxiosConfigIndGameList {
	method: string,
	url: string,
	headers: {
		'Content-Type': string
	},
	data: ExploreConfigData | AdvancedConfigData
}

interface PreferencesRecList {
	name: string,
	result: MultiObj[]
}


export type { ButtonField, GameDetailObj, LanguageTable, GameContextObj, OverviewObj, ArtworkObj, LanguageObj, ScreenshotsObj, SimilarObj, VideoObj, WebsiteObj, AuxiliaryObj, MultiObj, GenericStringObj, LocalStorageObj, SimpleSearchConfig, SimpleNullableSearchConfig, NestedSearchConfig, ProfilePrefSearchConfig, SearchResultsObj, FilterContextObj, AdvFilterContextObj, AxiosConfigIndGameList, PreferencesRecList }