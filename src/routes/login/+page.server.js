import { redirect } from '@sveltejs/kit';
import {supabase} from '$lib/server/supabase';


export const actions = {
	login: async (event) => {
		const  {request,cookies}=event;
		// TODO log the user in
		let formData = await request.formData();
		let email = formData.get('email') || '';
		let password = formData.get('password') || '';

		const { data, error } = await event.locals.supabase.auth.signInWithPassword({ email: email.toString(), password: password.toString() });

		if (data) {
			cookies.set('supabase.auth.token', data.session?.access_token ?? '', {
				path: '/'
			});
			throw redirect(303, '/');
		}else{
			
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