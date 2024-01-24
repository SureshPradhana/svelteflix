
import { error } from '@sveltejs/kit';

export async function load(event) {
	const { id } = event.params;
	const user_id=event.locals.user
	if(user_id){
	const { status, data } = await event.locals.supabase
    .from('watchlist')
    .select()
    .eq('movie_id', id)
    .eq('user_id', user_id)
    .limit(1)
	if(!status){
		throw error(status);
	}
	return {
		in_watchlist: data!.length>0
	};
}
return {
	in_watchlist: false
};
}