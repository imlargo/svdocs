import type { HandleServerError } from '@sveltejs/kit/hooks';
import { logger } from '#lib/core/logger.js';

// Only unexpected errors are logged: `error(404, ...)` and framework 404s already carry a safe
// message, and they say more about crawlers than about the app.
export const handleError: HandleServerError = ({ kind, error }) => {
	if (kind !== 'unknown') return;
	return { message: logger.error('server', error) };
};
