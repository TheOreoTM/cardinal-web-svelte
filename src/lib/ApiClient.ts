import type { TransformedLoginData } from './utils/api/types';
import { apiFetch } from './utils/util';

export namespace ApiClient {
	export async function fetchUser(cookie: string) {
		const response = await apiFetch<TransformedLoginData>('users/@me', {
			method: 'GET',
			headers: {
				Cookie: `${cookie}`
			}
		});

		return response;
	}
}
