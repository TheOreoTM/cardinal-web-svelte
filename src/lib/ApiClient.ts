import { CARDINAL_API_URL } from '$env/static/private';
import type { ApiPath, TransformedLoginData } from './utils/api/types';

export class ApiClient {
	public constructor() {}

	private static async fetch<T>(path: ApiPath, options: RequestInit = {}) {
		const response = await fetch(`${CARDINAL_API_URL}${path}`, {
			...options,
			credentials: 'include',
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

	static async fetchUser() {
		const response = await this.fetch<TransformedLoginData>('users/@me');

		console.log('fetchUser');
		console.log(response);
		return response;
	}
}
