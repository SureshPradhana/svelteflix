
export function load(events) {
	return {
		user: events.locals.user && {
            id: events.locals.user,
			email: events.locals.email
		}
	};
}