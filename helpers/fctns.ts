const ratingFloatToStar = (rating: number) : number => rating / 20

const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })

const formattedYear = (inpDate: string) => new Date(inpDate).getFullYear()

const sortMap = new Map<string, string>([
	['IGDB Rating', 'total_rating_count'],
	['Relevance', 'follows'],
	['Title', 'name'],
	['Release Date', 'first_release_date']
])

const platformMap = new Map<string, string[]>([
	['Xbox', ['169', '12', '49']],
	['Playstation', ['7', '8', '9', '48', '167', '165']],
	['Linux', ['3']],
	['Nintendo', ['130', '4', '41', '18', '22', '20', '21', '33', '5']],
	['PC', ['6']]
])

export { ratingFloatToStar, formattedDateLong, formattedYear, sortMap, platformMap }

// query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo,first_release_date,follows,name,total_rating,total_rating_count;
// 	where total_rating_count > 100 & age_ratings!=n;
// 	sort total_rating_count desc;
// 	limit 50;
// };


