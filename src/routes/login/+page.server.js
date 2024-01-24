import { Redirect, redirect } from '@sveltejs/kit';
import { db, users } from '$lib/server/supabase';


export const actions = {
	login: async ({ request,cookies }) => {
		// TODO log the user in
		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		let access_token = await db.signIn(email.toString(), password.toString());
		if (access_token) {
			cookies.set('supabase.auth.token', access_token, { path: '/' });
			console.log(access_token)
			console.log('logged in')
			console.log(cookies.get('supabase.auth.token'))
			throw redirect(303, '/');
		}else{
			console.log('not logged in')
			throw redirect(303, '/login');
		}

	}
	// register: async ({ request }) => {
	// 	// TODO register the user
	// 	let formData = await request.formData();
	// 	let email = formData.get('email') || '';
	// 	let password = formData.get('password') || '';
	// 	let username = formData.get('username') || '';

	// 	let boolean = await db.signUp(email.toString(), password.toString());
	// 	if (boolean) {
	// 		return {
	// 			status: 200,
	// 			body: {
	// 				message: 'Registered!'
	// 			}
	// 		};

	// 	}
	// }
};