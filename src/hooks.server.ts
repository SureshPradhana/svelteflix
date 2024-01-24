import {db,users} from '$lib/server/supabase';
export async function handle({ event, resolve }) {
	// const response = await resolve(event, {
	// 	transformPageChunk: ({ html }) => html.replace('old', 'new'),
	// 	filterSerializedResponseHeaders: (name) => name.startsWith('x-'),
	// 	preload: ({ type, path }) => type === 'js' || path.includes('/important/')
	// });

	// return response;
  if (db.getname(event.cookies.get('supabase.auth.token'))) {
    event.locals.user = db.getname(event.cookies.get('supabase.auth.token')); 
  }
  return await resolve(event);
}