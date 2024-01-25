import { supabase } from '$lib/server/supabase';
import { redirect } from '@sveltejs/kit';
import {status} from '$lib/stores'

export const actions = {
	async default(event) {
		
		const { request } = event;

		
		const { error } = await event.locals.supabase.auth.signOut();
		if (error) {
		    	
			status.set({ message: 'Logout unsuccessful', type: 'error' });
			throw redirect(303, '/login')
		}else{
			// const {s}=await event.locals.supabase.cookies.remove('supabase.auth.token', {path:'/'})

			status.set({ message: 'Logout successful', type: 'success' });
			const e=await event.cookies.delete('supabase.auth.token', {path:'/'})
		throw redirect(303, '/');
		}
	}
};