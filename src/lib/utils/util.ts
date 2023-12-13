import { CARDINAL_API_URL } from '$env/static/private';
import type { ApiPath } from './api/types';

/**
 * Base API
 * @param path
 * @param options
 * @returns
 */
export async function apiFetch<T>(path: ApiPath, options: RequestInit = {}) {
	const response = await fetch(`${CARDINAL_API_URL}${path}`, {
		...options,
		credentials: 'include',
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	});

	const jsonResponse = await response.json();
	console.log('🚀 ~ file: util.ts:22 ~ jsonResponse:', jsonResponse);

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}
