export const load = async ({ locals }) => {

	return {
		locals: {
			...locals,
			user: locals.user || null
		}
	}
}