// import { supabase } from '$lib/server/supabase.js';
import {db, users} from '$lib/server/supabase';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(307, '/login');
	}
	console.log(locals)

	const movies = await db.getwatchlist(locals.user);

	return {
		ids: movies.map((movie) => movie)
	};
}

// export const actions = {
// 	add: async ({ locals, request }) => {
// 		const { user_id, movie_id } = await validate(locals, request);

// 		await supabase.from('watchlist').insert({
// 			user_id,
// 			movie_id
// 		});

// 		throw redirect(303, request.headers.get('referer') ?? '/watchlist');
// 	},

// 	delete: async ({ locals, request }) => {
// 		const { user_id, movie_id } = await validate(locals, request);

// 		await supabase.from('watchlist').delete().eq('user_id', user_id).eq('movie_id', movie_id);

// 		throw redirect(303, request.headers.get('referer') ?? '/watchlist');
// 	}
// };

// async function validate(locals: App.Locals, request: Request) {
// 	if (!locals.user) throw error(401);

// 	const form = await request.formData();
// 	const movie_id = form.get('movie_id');

// 	if (!movie_id) {
// 		throw new Error('missing movie id');
// 	}

// 	return {
// 		user_id: locals.user.id,
// 		movie_id
// 	};
// }

