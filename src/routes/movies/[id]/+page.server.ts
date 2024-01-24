import {db,users} from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export async function load({ locals, params }) {
	if (locals.user) {
		const data=  db.getwatchlist(locals.user);

		if (!data) {
			throw error(404, `Could not find watchlist`);
		}

		return {
			in_watchlist: data!.length > 0
		};
	}

	return {
		in_watchlist: false
	};
}