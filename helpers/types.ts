import { AgeRatings, Categories, Companies, Covers, Languages, Platforms, Videos } from '../../backendga/helpers/requests'

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
	id: number | null,
	artworks: string[],
	title: string,
	story: string,
	summary: string,
}

type LanguageObj = {
	id: number | null,
	language_supports: Languages[],
	title: string,
	story: string,
	summary: string,
}

type ScreenshotsObj = {
	id: number | null,
	screenshots: string[],
	title: string,
	story: string,
	summary: string,
}

type SimilarObj = {
	id: number | null,
	similar_games: Covers[],
	title: string,
	story: string,
	summary: string,
}

type VideoObj = {
	id: number | null,
	videos: Videos[],
	title: string,
	story: string,
	summary: string,
}

type WebsiteObj = {
	id: number | null,
	websites: Categories[],
	title: string,
	story: string,
	summary: string,
}

type GameContextObj = {
	dataFetch: GameDetailObj | undefined,
	error: null,
	loading: boolean
}

export type { ButtonField, GameDetailObj, LanguageTable, GameContextObj, OverviewObj, ArtworkObj, LanguageObj, ScreenshotsObj, SimilarObj, VideoObj, WebsiteObj }