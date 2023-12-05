import { DISCORD_AUTHORIZATION_URL } from '$lib/utils/constants';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	return new Response(null, {
		headers: { Location: locals.user ? '/dashboard' : DISCORD_AUTHORIZATION_URL },
		status: 302
	});
};
