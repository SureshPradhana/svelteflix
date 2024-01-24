
export function load({ locals }) {

	return {
		user: locals.user && {
            id: locals.user,
			email: locals.email
		}
	};
}