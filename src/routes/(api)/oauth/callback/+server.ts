import type { RequestHandler } from './$types';
import { validateNewCookie } from '$lib/utils/auth';
import { sendToHome, sendToOAuthError } from '$lib/utils/api/other';
import { PathNames, REDIRECT_URI } from '$lib/utils/constants';
import type { TransformedLoginData } from '$lib/utils/api/types';
import { apiFetch } from '$lib/utils/util';
import { BASE_CARDINAL_API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ locals, url, fetch }) => {
	const code = url.searchParams.get('code') ?? null;
	if (!code) return sendToHome();

	try {
		const body = JSON.stringify({
			code: code,
			redirectUri: REDIRECT_URI
		});

		const response = await fetch(`${BASE_CARDINAL_API_URL}/oauth/callback`, {
			method: 'POST',
			credentials: 'include',
			body,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseBody = await response.json();

		const logindata = responseBody as TransformedLoginData;
		const newCookie = response.headers.get('set-cookie');

		const result = validateNewCookie(newCookie);
		if (!result || !logindata.user) return sendToOAuthError();

		return new Response(undefined, {
			status: 302,
			headers: {
				location: PathNames.Index,
				'set-cookie': newCookie
			}
		});
	} catch (err: unknown) {
		console.error('Login Error:', err);
		return sendToOAuthError();
	}
};
