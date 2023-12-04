import { discord } from '@lucia-auth/oauth/providers';
import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { CLIENT_SECRET } from '$env/static/private';
import { getRedirectUri } from '$lib/utils/util';
import { auth } from './lucia';

export const discordAuth = discord(auth, {
	clientId: PUBLIC_CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: getRedirectUri(),
	scope: ['identify', 'guilds']
});
