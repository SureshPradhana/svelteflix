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
			user:any; 
			getSession: () => Promise<import('@supabase/supabase-js').Session | null>;

		}
		interface PageData {
			infinite?: boolean;
			title: string;
		}

	}
}

export {};
