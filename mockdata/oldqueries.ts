/* eslint-disable @typescript-eslint/no-unused-vars */
const query1 = `query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo,first_release_date,follows,name,total_rating,total_rating_count;
	where total_rating_count > 100 & age_ratings!=n;
	sort total_rating_count desc;
	limit 50;
};`

const query2 = `query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo, platforms.platform_family, first_release_date,follows,name,total_rating,total_rating_count;
	where total_rating_count > 100 & age_ratings!=n & platforms = {48} | platforms = {167};
	limit 50;
};`

const query3 = `query games "Filtered 50" {fields id ,age_ratings.category, age_ratings.rating, cover.url, platforms.name,platforms.category,platforms.platform_logo, platforms.platform_family, first_release_date,follows,name,total_rating,total_rating_count;
	where total_rating_count > 50 & age_ratings!=n;
   sort first_release_date desc;
	limit 10;
};`

const query4 = `query games "Filtered 2" {fields id,age_ratings.category,age_ratings.rating,cover.url,platforms.name,platforms.category,platforms.platform_logo.url,platforms.platform_family,first_release_date,follows,name,total_rating,total_rating_count, genres.name, involved_companies.company.name, involved_companies.company.logo.url, involved_companies.developer, involved_companies.company.websites.url, involved_companies.company.websites.category;
 	where total_rating_count > 5 & age_ratings.rating!=n & involved_companies!= n & involved_companies.developer != n;
 		sort first_release_date desc;
 		limit 25;
 	};`

const query5 = `query companies "Filtered 2" {fields id,name,logo.url,websites.url,websites.category;
	where name != n & logo != n;
		limit 25;
	};`

const query6 = `query companies "Filtered 2" {fields id,name,logo.url,websites.url,websites.category,start_date;
	where name != n & logo != n & start_date != n & name ~ "Acti"*; sort start_date asc;
};`