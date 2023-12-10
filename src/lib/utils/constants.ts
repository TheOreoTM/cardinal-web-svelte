import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

const DISCORD_OAUTH_URL = `https://discord.com/oauth2/authorize`;
export const DISCORD_API_URL = 'https://discord.com/api/v10/';
export const DISCORD_CLIENT_ID = '740962735306702858';

export const oauthURL = new URL(DISCORD_OAUTH_URL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${PUBLIC_BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', DISCORD_CLIENT_ID]
]).toString();

export const DISCORD_AUTHORIZATION_URL = oauthURL.toString();
export const PathNames = {
	Index: '/',
	Manage: '/manage',
	Logout: `/oauth/logout`,
	Login: `/oauth/login`,
	Callback: `/oauth/callback`,
	Status: `https://status.oreotm.xyz`
};

export const REDIRECT_URI = `${PUBLIC_BASE_WEB_URL}${PathNames.Callback}`;
