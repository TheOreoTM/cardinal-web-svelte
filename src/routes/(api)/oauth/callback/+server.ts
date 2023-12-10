import type { RequestHandler } from './$types';
import { validateNewCookie } from '$lib/utils/auth';
import { sendToHome, sendToOAuthError } from '$lib/utils/api/other';
import { PathNames, REDIRECT_URI } from '$lib/utils/constants';
import { BASE_CARDINAL_API_URL } from '$env/static/private';
import type { TransformedLoginData } from '$lib/utils/api/types';

export const GET: RequestHandler = async ({ locals, url, fetch }) => {
	const code = url.searchParams.get('code') ?? null;
	if (!code) return sendToHome();

	console.log(REDIRECT_URI);

	try {
		const body = JSON.stringify({
			code: code,
			redirectUri: REDIRECT_URI
		});

		const response = await fetch(`${BASE_CARDINAL_API_URL}/oauth/callback`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: body
		});

		const responseBody = await response.json();
		console.log('response', responseBody);

		const logindata = responseBody as TransformedLoginData;
		const newCookie = response.headers.get('set-cookie');

		console.log('code', code, typeof code);
		console.log('newCookie', newCookie);

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
		console.error(err);
		return sendToOAuthError();
	}
};
