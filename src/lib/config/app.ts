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
}

export const config: AppConfig = {
	// Hardcoded, not env-driven: this changes once per project, not once per deploy environment.
	branding: {
		name: 'App',
		logo: defaultLogo,
		favicon: defaultFavicon,
		seo: {
			title: 'App',
			description: ''
		}
	}
};
