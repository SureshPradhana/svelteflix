
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
	const { status:status2, data:data2 } = await event.locals.supabase
	.from('watchedlist')
	.select()
	.eq('movie_id', id)
	.eq('user_id', user_id)
	.limit(1)
	if(!status2){
		throw error(status2);
	}
	return {
		in_watchlist: data!.length>0,
		in_watchedlist: data2!.length>0
	};
}
return {
	in_watchlist: false,
	in_watchedlist: false
};
}