import * as api from '$lib/api';
import type { MovieDetails } from '$lib/types.js';

export async function load({ data, params, fetch }) {
	const movie = (await api.get(fetch, `/movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	const trailer = movie.videos.results.find((video) => {
		return (
			video.official &&
			video.site === 'YouTube' &&
			(video.type === 'Trailer' || video.type === 'Teaser')
		);
	});
	console.log(data.in_watchedlist,data.in_watchlist)

	return {
		in_watchlist: data.in_watchlist,
		in_watchedlist: data.in_watchedlist,
		movie,
		trailer,
		title: movie.title
	};
}