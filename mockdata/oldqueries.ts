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