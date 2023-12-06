import type { RequestEvent } from '@sveltejs/kit';

import type { DiscordUser } from '$lib/types';
import { DISCORD_API_URL } from '$lib/utils/constants';
import { buildSearchParams, requestDiscordToken, setCookies } from '$lib/utils/api/discord';

export async function authenticateUser(event: RequestEvent): Promise<DiscordUser | null> {
	const token = await getOrRefreshToken(event);
	if (!token) {
		return null;
	}

	return await fetch(`${DISCORD_API_URL}/users/@me`, {
		headers: { Authorization: `Bearer ${token}` }
	}).then((request) => request.json());
}

export async function getOrRefreshToken(event: RequestEvent): Promise<string | null> {
	const token = event.cookies?.get('discord_access_token');
	if (token) {
		return token;
	}

	// if only refresh token is found, access token has expired
	// fetch refresh only if not already on refresh route (otherwise recursion go brrr)
	const refreshToken = event.cookies?.get('discord_refresh_token');
	if (refreshToken && !event.url.pathname.startsWith('/api/discord/refresh')) {
		const tokens = await requestDiscordToken(
			buildSearchParams('identify email', 'refresh', refreshToken)
		);
		setCookies(tokens, event.cookies);
		return tokens.access_token;
	}

	return null;
}
