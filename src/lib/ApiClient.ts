import { CARDINAL_API_URL } from '$env/static/private';
import type { ApiPath, TransformedLoginData } from './utils/api/types';

export namespace ApiClient {
	async function fetchApi<T>(path: ApiPath, options: RequestInit = {}) {
		const response = await fetch(`${CARDINAL_API_URL}${path}`, {
			...options,
			credentials: 'include',
			headers: {
				...options.headers,
				'Content-Type': 'application/json'
			}
		});

		const jsonResponse = await response.json();
		console.log('jsonResponse', jsonResponse);

		if (jsonResponse.error) {
			throw response;
		} else {
			return jsonResponse as T;
		}
	}

	export async function fetchUser() {
		const response = await fetchApi<TransformedLoginData>('users/@me');

		return response;
	}
}
