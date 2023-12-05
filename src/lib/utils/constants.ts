import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

export const DISCORD_API_URL = 'https://discord.com/api/v10/';
const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
export const DISCORD_CLIENT_ID = '740962735306702858';
export const DISCORD_AUTHORIZATION_URL =
	'https://discord.com/api/oauth2/authorize?client_id=740962735306702858&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5137%2Fapi%2Fdiscord%2Fcallback&scope=identify+guilds';

export const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${PUBLIC_BASE_WEB_URL}/manage`],
	['response_type', 'token'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', DISCORD_CLIENT_ID]
]).toString();

export const PathNames = {
	index: '',
	manage: 'manage',
	logout: '/api/auth/logout',
	login: '/api/auth/login'
};
