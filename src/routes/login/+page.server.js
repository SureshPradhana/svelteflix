import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';
import { fail } from '@sveltejs/kit';
import { successMessage,errorMessage } from '$lib/stores';



export function load({request,url}){
	const referer = request.headers.get('referer');

	const redirect_to = referer?.startsWith(url.origin) ? encodeURIComponent(referer) : null;

	return {
		redirect_to,
		title: 'Log in'
	};
}

export const actions = {
	login: async (event) => {
		const { request, cookies,url} = event;
		
		// TODO log the user in
		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		const { data, error } = await event.locals.supabase.auth.signInWithPassword({ email: email.toString(), password: password.toString() });
		if (error) {
			errorMessage.set('Login failed');
			throw redirect(303, '/login');
		}
		successMessage.set('Login successful');
		cookies.set('supabase.auth.token', data.session?.access_token ?? '', {
			path: '/'
		});
		throw redirect(303, `${url.searchParams.get('redirect_to') ?? '/'}`);

	},
	register: async (event) => {
		// TODO register the user

		const { request, cookies,url } = event;

		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		let { data, error } = await supabase.auth.signUp({ email: email.toString(), password: password.toString() })
		if (error) {
			errorMessage.set('Registration failed');
			throw redirect(303, '/login');
		}
		errorMessage.set('Registration successful');
		throw redirect(303, url.searchParams.get('redirect_to') ?? '/');
	}
};