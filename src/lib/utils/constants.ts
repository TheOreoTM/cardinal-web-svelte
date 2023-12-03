import { PUBLIC_BASE_WEB_URL, PUBLIC_CLIENT_ID } from '$env/static/public';

export const DISCORD_API_URL = 'https://discord.com/api/v10/';
const DiscordOauthURL = `https://discord.com/oauth2/authorize`;

export const oauthURL = new URL(DiscordOauthURL);
oauthURL.search = new URLSearchParams([
	['redirect_uri', `${PUBLIC_BASE_WEB_URL}/oauth/callback`],
	['response_type', 'code'],
	['scope', ['identify', 'guilds'].join(' ')],
	['client_id', PUBLIC_CLIENT_ID]
]).toString();
