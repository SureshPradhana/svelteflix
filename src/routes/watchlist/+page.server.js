// import { supabase } from '$lib/server/supabase.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	const {data,error} = await locals.supabase.from('watchlist').select('*').eq('user_id',locals.user)
	
	let movies=[]
	for (const movie of data) {
		movies.push(movie.movie_id)
	}

	return {
		ids:movies
	};
}

export const actions = {
	add: async ({ locals, request }) => {
		const { user } = locals;
		const formdata=await request.formData();
		const movie_id=formdata.get('movie_id');


		

		let d=await locals.supabase.from('watchlist').insert({
			user_id:user,
			movie_id
		});
		if(d.error){
			throw error(500,d.error)
		}else{
			throw redirect(303,'/watchlist');
		}
	},

	delete: async ({ locals, request }) => {
		const { user } = locals;
		const formdata=await request.formData();
		const movie_id=formdata.get('movie_id');


		await locals.supabase.from('watchlist').delete().eq('user_id', user).eq('movie_id', movie_id);

		throw redirect(303, request.headers.get('referer') ?? '/watchlist');
	}
};

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

