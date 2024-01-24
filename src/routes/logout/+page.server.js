import { supabase } from '$lib/server/supabase';
import { redirect } from '@sveltejs/kit';

export const actions = {
	async default(event) {
		
		const { request } = event;

		
		const { error } = await event.locals.supabase.auth.signOut();
		if (error) {

			throw redirect(303, '/login')
		}else{
			// const {s}=await event.locals.supabase.cookies.remove('supabase.auth.token', {path:'/'})
			const e=await event.cookies.delete('supabase.auth.token', {path:'/'})
		throw redirect(303, '/');
		}
	}
};