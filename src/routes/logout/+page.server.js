import {db} from '$lib/server/supabase';
import { redirect } from '@sveltejs/kit';

export const actions = {
	async default({ request, cookies }) {
const siginout = db.signOut(cookies.get('supabase.auth.token'));
cookies.delete('supabase.auth.token', { path: '/' });
			cookies.delete('supabase.auth.token', { path: '/' });
		if (siginout) {
			console.log('logged out')
		}

		
		throw redirect(303, '/');
	}
};