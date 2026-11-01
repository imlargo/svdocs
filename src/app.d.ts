/// <reference types="@svmd/vite/client" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		interface Error {
			/** Set by `handleError` for unexpected errors, and logged alongside them. */
			errorId?: string;
		}

		// interface Locals {}
		interface PageData {
			/** A docs page's table of contents, from the headings svmd read at build time. */
			toc?: import('#lib/components/coral/kit/toc/headings.js').TocHeading[];
		}
		// interface PageState {}
	}
}

export {};
