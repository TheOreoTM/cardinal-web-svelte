import type { PartialGuild } from '$lib/types';
import { fetchDiscordApi } from '$lib/utils/util';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const data = await fetchDiscordApi<PartialGuild>(`guilds/${params.guildId}`);
	return json({ ...data });
};
