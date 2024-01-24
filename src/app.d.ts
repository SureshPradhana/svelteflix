// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			supabase: import('@supabase/ssr').createServerClient | null;
			user: any;
			email: string;
			getSession: () => Promise<import('@supabase/supabase-js').Session | null>;

		}
		interface PageData {
			user:{
				id:string;
				email:string;
			}
			email:string;
			infinite?: boolean;
			title: string;
			session: import('@supabase/supabase-js').Session | null;
		}

	}
}

export { };
