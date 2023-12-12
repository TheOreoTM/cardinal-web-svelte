import type { TransformedLoginData } from './utils/api/types';
import { apiFetch } from './utils/util';

export namespace ApiClient {
	export async function fetchUser() {
		const response = await apiFetch<TransformedLoginData>('users/@me');

		return response;
	}
}
