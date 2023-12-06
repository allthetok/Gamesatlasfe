type AgeRatings = {
	ESRB: number,
	PEGI: number
}

type Categories = {
	category: number,
	url: string
}

type Companies = {
	name: string,
	url: string,
	officialSite: string
}

type Platforms = {
	name: string,
	category: number,
	url: string,
	id: number,
	platform_family: number,
}

type Covers = {
	name: string,
	cover: string | number
}

type Languages = {
	language: string | number,
	language_support_type: string,
	marked: boolean,
	locale: string,
	native: string
}

type Videos = {
	name: string,
	ytlink: string
}

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

interface SimpleUserLikeConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		userid: number
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
	// platform: MultiObj[],
	// genres: MultiObj[],
	// themes: MultiObj[],
	// gamemodes: MultiObj[]
	name: string,
	result: MultiObj[]
}

type AgeRatingsInter = {
	id: number,
	category: number,
	rating: number
}

interface Explore {
	id: number | null,
	age_ratings: any | AgeRatingsInter[] | AgeRatings
	cover: string | null,
	platforms: Platforms[],
	rating: number,
	ratingCount: number | null,
	releaseDate: Date | string,
	likes: number | null,
	title: string,
	genres: GenericStringObj[],
	involved_companies: Companies[],
}


interface InternalUser {
	emailVerified: boolean,
	externalId: string | null,
	id: string,
	profileid: string,
	provider: string,
}

interface OAuthUser {
	emailVerified: boolean,
	externalId: string | null,
	id: string,
	profileid: string,
	provider: string,
}

type SimilarGamesObj = {
	similar_games: Explore[]
}

type GameObj = {
	id: number,
	age_ratings: any | AgeRatingsInter[] | AgeRatings,
	artworks: string[],
	category: string | undefined,
	cover: string,
	external_games: Categories[],
	releaseDate: Date | string,
	likes: number,
	game_modes: string[],
	genres: GenericStringObj[],
	hypes: number,
	involved_companies: Companies[],
	keywords: string[],
	title: string,
	platforms: Platforms[],
	player_perspectives: string[],
	screenshots: string[],
	similar_games: Explore[],
	slug: string,
	story: string,
	summary: string,
	tags: string,
	themes: GenericStringObj[],
	rating: number,
	ratingCount: number,
	url: string,
	videos: Videos[],
	websites: Categories[],
	languages: Languages[],
	game_localizations: {
		name: string,
		region: string
	}[],
}

interface Explore {
	id: number | null,
	age_ratings: any | AgeRatingsInter[] | AgeRatings
	cover: string | null,
	platforms: Platforms[],
	rating: number,
	ratingCount: number | null,
	releaseDate: Date | string,
	likes: number | null,
	title: string,
	genres: GenericStringObj[],
	involved_companies: Companies[],
}

type GlobalAuxiliaryObj = {
	title: string,
	involved_companies: Companies[],
	summary: string,
	story: string,
	releaseDate: Date | string
}

interface ArtworksObj {
	artworks: string[]
}

interface ScreenshotObj {
	screenshots: string[]
}

interface VideosObj {
	videos: Videos[]
}

interface WebsitesObj {
	websites: Categories[]
}

export type { ArtworksObj, ScreenshotObj, VideosObj, WebsitesObj, SimilarGamesObj, GameObj, AgeRatings, Platforms, Covers, Videos, Categories, Languages, Companies, GlobalAuxiliaryObj, InternalUser, OAuthUser, ButtonField, GameDetailObj, Explore, LanguageTable, GameContextObj, OverviewObj, ArtworkObj, LanguageObj, ScreenshotsObj, SimilarObj, VideoObj, WebsiteObj, AuxiliaryObj, MultiObj, GenericStringObj, LocalStorageObj, SimpleSearchConfig, SimpleNullableSearchConfig, NestedSearchConfig, ProfilePrefSearchConfig, SearchResultsObj, FilterContextObj, AdvFilterContextObj, AxiosConfigIndGameList, PreferencesRecList, SimpleUserLikeConfig }