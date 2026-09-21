import type { HandleServerError } from '@sveltejs/kit';
import { logger } from '$lib/core/logger';

export const handleError: HandleServerError = ({ error, status }) => {
	// 404s are noise: they say more about crawlers than about the app.
	if (status === 404) return { message: 'Not found.' };
	return { message: logger.error('server', error) };
};
