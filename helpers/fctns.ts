const ratingFloatToStar = (rating: number) : number => rating / 20

const formattedDateLong = (inpDate: string) => new Date(inpDate).toLocaleDateString('en-us', { year: 'numeric', 'month': 'long', 'day': 'numeric' })

const formattedYear = (inpDate: string) => inpDate !== 'N/A' ? new Date(inpDate).getFullYear() : 'N/A'

const createAxiosConfig = (method: string, endpoint: string, sortBy: string, sortDirection: string, platform: string, limit: string, genre: string) => {
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

export { ratingFloatToStar, formattedDateLong, formattedYear, createAxiosConfig }

// query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo,first_release_date,follows,name,total_rating,total_rating_count;
// 	where total_rating_count > 100 & age_ratings!=n;
// 	sort total_rating_count desc;
// 	limit 50;
// };

// query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo, platforms.platform_family, first_release_date,follows,name,total_rating,total_rating_count;
// 	where total_rating_count > 100 & age_ratings!=n & platforms = {48} | platforms = {167};
// 	limit 50;
// };

// query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo, platforms.platform_family, first_release_date,follows,name,total_rating,total_rating_count;
// 	where total_rating_count > 50 & age_ratings!=n;
//    sort first_release_date desc;
// 	limit 10;
// };

