import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

export const DISCORD_API_URL = 'https://discord.com/api/v10/';
const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
export const DISCORD_CLIENT_ID = '740962735306702858';

export const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${PUBLIC_BASE_WEB_URL}/api/discord/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', DISCORD_CLIENT_ID]
]).toString();

export const DISCORD_AUTHORIZATION_URL = oauthURL.toString();
export const PathNames = {
	Index: '/',
	Manage: '/manage',
	Logout: `/api/discord/logout`,
	Login: `/api/discord/login`,
	Status: `https://status.oreotm.xyz`
};
