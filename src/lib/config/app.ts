import defaultLogo from '$lib/assets/logo.svg';
import defaultFavicon from '$lib/assets/favicon.svg';

export interface AppConfig {
	/** Single source of truth for name/logo/favicon/SEO. */
	branding: {
		name: string;
		logo: string;
		favicon: string;
		seo: {
			title: string;
			description: string;
		};
	};
	links: {
		/** Repository URL. The navbar's GitHub button only links out when this is set. */
		github: string;
	};
}

export const config: AppConfig = {
	// Hardcoded, not env-driven: this changes once per project, not once per deploy environment.
	branding: {
		name: 'svdocs',
		logo: defaultLogo,
		favicon: defaultFavicon,
		seo: {
			title: 'svdocs',
			description: 'A Svelte 5 + shadcn-svelte template for building documentation sites.'
		}
	},
	links: {
		github: 'https://github.com/imlargo/svdocs'
	}
};
