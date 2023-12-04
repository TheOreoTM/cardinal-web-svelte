import { API_URL, CARDINAL_API_URL, DISCORD_TOKEN } from '$env/static/private';
import { DISCORD_API_URL } from './constants';
import type { ApiPath } from '../types';
import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

export function getRedirectUri() {
	return `${PUBLIC_BASE_WEB_URL}/api/auth/callback`;
}

/**
 * Base API
 * @param path
 * @param options
 * @returns
 */
export async function apiFetch<T>(path: ApiPath, options: RequestInit = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: 'include',
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
			Authorization: `Bot ${DISCORD_TOKEN}`
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

	console.log(jsonResponse);

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
		...options,
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const jsonResponse = await response.json();
	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}
