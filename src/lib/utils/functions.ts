import { DISCORD_CLIENT_ID } from './constants';
import { PUBLIC_BASE_WEB_URL } from '$env/static/public';

export function getRedirectUri() {
	return `${PUBLIC_BASE_WEB_URL}/api/auth/callback`;
}

export function getUserAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/avatars/${id}/${icon}.png`;
	if (icon == null)
		return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
	return url;
}

export function generateBotInvite(data?: { guildId?: string; redirectTo?: string }) {
	let baseUrl = new URL(
		`https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=1495118769270&scope=bot`
	);

	if (data?.guildId) baseUrl.searchParams.append('guild_id', data.guildId);
	if (data?.redirectTo) baseUrl.searchParams.append('redirect_uri', encodeURI(data.redirectTo));

	return baseUrl.toString();
}

export function getGuildAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
	if (icon == null)
		return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
	return url;
}
