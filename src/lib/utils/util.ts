import { API_URL, CARDINAL_API_URL, DISCORD_TOKEN } from '$env/static/private';
import type { ApiPath } from './api/types';
import { DISCORD_API_URL } from './constants';

/**
 * Base API
 * @param path
 * @param options
 * @returns
 */
export async function apiFetch<T>(path: ApiPath, options: RequestInit = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: 'same-origin',
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

/**
 * Cardinal API
 * @param path
 * @param options
 * @returns
 */
export async function cardinalApiFetch<T>(path: ApiPath, options: RequestInit = {}) {
	const response = await fetch(`${CARDINAL_API_URL}${path}`, {
		...options
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

/**
 * Discord API
 * @param path
 * @param options
 * @returns
 */

export async function fetchDiscordApi<T>(path: string, options: RequestInit = {}) {
	const response = await fetch(`${DISCORD_API_URL}${path}`, {
		...options
	});

	const jsonResponse = await response.json();
	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}
