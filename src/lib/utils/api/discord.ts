import { DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, DISCORD_TOKEN } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import { DISCORD_API_URL, DISCORD_CLIENT_ID } from '../constants';
import type { Channel, Guild, PartialGuild } from '$lib/types';
import type {
	APIRole,
	GuildChannelType,
	RESTGetAPIGuildChannelsResult,
	Snowflake
} from 'discord-api-types/v10';
import type { APIGuildChannel } from 'discord-api-types/v9';

const ACCESS_TOKEN_COOKIE = 'discord_access_token';
const REFRESH_TOKEN_COOKIE = 'discord_refresh_token';

export const fetchGuildRoles = async (guildId: Snowflake) => {
	if (isNaN(Number(guildId))) return null; // Snowflakes should be castable to a number

	const response = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const jsonResponse = await response.json();
	if (jsonResponse.error) {
		console.error('There was an error fetching guild:', guildId);
		return null;
	}

	const roles = jsonResponse as APIRole[];

	if (!roles.length) return []; // No roles

	return roles;
};

/**
 * Safely fetch a guilds channels, will return null if the guildId doesnt resolve to a number or the guild doesnt exist or bot isnt authorized
 * @param guildId The id of the guild
 * @returns
 */
export const fetchGuildChannels = async (guildId: Snowflake) => {
	if (isNaN(Number(guildId))) return null; // Snowflakes should be castable to a number

	const response = await fetch(`${DISCORD_API_URL}/guilds/${guildId}/channels`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const jsonResponse = await response.json();
	if (jsonResponse.error) {
		console.error('There was an error fetching guild:', guildId);
		return null;
	}

	const channels = jsonResponse as APIGuildChannel<GuildChannelType>[];

	if (!channels.length) return []; // No channels

	return channels;
};

/**
 * Safely fetch a guild, will return null if the guildId doesnt resolve to a number or the guild doesnt exist or bot isnt authorized
 * @param guildId The id of the guild
 * @returns
 */
export const fetchGuild = async (guildId: Snowflake) => {
	if (isNaN(Number(guildId))) return null; // Snowflakes should be castable to a number

	const response = await fetch(`${DISCORD_API_URL}/guilds/${guildId}`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const jsonResponse = await response.json();
	if (jsonResponse.error) {
		console.error('There was an error fetching guild:', guildId);
		return null;
	}

	const guild = jsonResponse as Guild;

	if (!guild.id) return null; // The guild doesnt exist

	return guild;
};

export const fetchBotGuilds = async (): Promise<PartialGuild[]> => {
	const request = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	return response;
};

export const fetchUserGuilds = async (token: string): Promise<PartialGuild[]> => {
	const request = await fetch(`${DISCORD_API_URL}/users/@me/guilds`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	return response;
};

export const requestDiscordToken = async (searchParams: URLSearchParams): Promise<Tokens> => {
	// performing a Fetch request to Discord's token endpoint
	const request = await fetch(`${DISCORD_API_URL}/oauth2/token`, {
		method: 'POST',
		body: new URLSearchParams(searchParams),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	const response = await request?.json();

	if (response.error) {
		throw response.error;
	}

	// redirect user to front page with cookies set
	const access_expire = new Date(Date.now() + response.expires_in); // 10 minutes
	const refresh_expire = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
	return {
		access_token: response.access_token,
		refresh_token: response.refresh_token,
		access_valid_until: access_expire,
		refresh_valid_until: refresh_expire
	};
};

export function buildSearchParams(
	scope: string,
	type: 'callback' | 'refresh',
	code: string
): URLSearchParams {
	const searchParams = new URLSearchParams();
	searchParams.append('client_id', DISCORD_CLIENT_ID);
	searchParams.append('client_secret', DISCORD_CLIENT_SECRET);
	searchParams.append('grant_type', type === 'callback' ? 'authorization_code' : 'refresh_token');
	searchParams.append(type === 'callback' ? 'code' : 'refresh_token', code);
	searchParams.append('redirect_uri', DISCORD_REDIRECT_URI);
	searchParams.append('scope', scope);
	return searchParams;
}

export function setCookies(tokens: Tokens, cookies: Cookies) {
	cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
		path: '/',
		expires: tokens.access_valid_until,
		httpOnly: true,
		sameSite: 'strict'
	});
	cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
		path: '/',
		expires: tokens.refresh_valid_until,
		httpOnly: true,
		sameSite: 'strict'
	});
}

export function deleteCookies(cookies: Cookies) {
	cookies.delete(ACCESS_TOKEN_COOKIE, { path: '/' });
	cookies.delete(REFRESH_TOKEN_COOKIE, { path: '/' });
}

export type Tokens = {
	access_token: string;
	refresh_token: string;
	access_valid_until: Date;
	refresh_valid_until: Date;
};
