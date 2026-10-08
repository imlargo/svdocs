import type { HandleClientError } from '@sveltejs/kit/hooks';
import { logger } from '#lib/core/logger.js';

export const handleError: HandleClientError = ({ kind, error }) => {
	if (kind !== 'unknown') return;
	return { message: logger.error('client', error) };
};
