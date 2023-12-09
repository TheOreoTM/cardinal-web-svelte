import { DISCORD_AUTHORIZATION_URL } from '$lib/utils/constants';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	throw redirect(302, DISCORD_AUTHORIZATION_URL);
};
