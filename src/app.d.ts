// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	
	// Déclarations pour les attributs personnalisés Netlify
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'netlify-honeypot'?: string;
			'data-netlify'?: boolean | string;
		}
	}
}

export {};
