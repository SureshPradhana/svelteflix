import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';


export const actions = {
	login: async (event) => {
		const { request, cookies } = event;
		// TODO log the user in
		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		const { data, error } = await event.locals.supabase.auth.signInWithPassword({ email: email.toString(), password: password.toString() });
		if (error) {
			throw redirect(303, '/login');
		}


		cookies.set('supabase.auth.token', data.session?.access_token ?? '', {
			path: '/'
		});
		throw redirect(303, '/');

	},
	register: async (event) => {
		// TODO register the user

		const { request, cookies } = event;

		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		let { data, error } = await supabase.auth.signUp({ email: email.toString(), password: password.toString() })
		if (error) {
			throw redirect(303, '/login');
		}
		
		throw redirect(303, '/login');
	}
};