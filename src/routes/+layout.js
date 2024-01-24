
export function load(events) {

	return {
		user: events.data.user && {
            id: events.data.user.id,
			email:events.data.user.email
		}
	};
}