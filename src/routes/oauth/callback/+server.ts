import { json } from '@sveltejs/kit';
import type { LoginData } from '@sapphire/plugin-api';
import { user } from '$lib/stores';
import { apiFetch, cardinalApiFetch } from '$lib/utils/util';
import type { RequestHandler } from './$types';
import { CARDINAL_API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	const code = new URL(url).searchParams.get('code');
	await exchangeCodeForAccessToken(code);
	return json({
		message: 'Logged In!'
	});
};

async function exchangeCodeForAccessToken(code: string | null) {
	const codeSearchParam = code;
	console.log(code);

	// Call the backend to exchange the code for an access token.
	const res = await cardinalApiFetch('status');
	const response = await fetch(`${CARDINAL_API_URL}/oauth/callback`, {
		method: 'POST',
		body: JSON.stringify({
			code: codeSearchParam
		})
	});

	console.log(await response);

	const data = (await (response as Response).json()) as LoginData;

	// Now store data somewhere so you can access it later.
	user.set(data);

	// Lastly, send the user back to the home page or similar:
	location.assign('/');
}
