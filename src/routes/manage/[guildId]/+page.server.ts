import { DISCORD_TOKEN } from '$env/static/private';
import type { Guild } from '$lib/types';
import { fetchDiscordApi } from '$lib/utils/util';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/utils/constants';

export const load = (async ({ params }) => {
	const castedGuildId = Number(params.guildId);
	if (isNaN(castedGuildId)) throw redirect(301, PathNames.Manage);
	const guildId = params.guildId;

	const fetchedGuild = await fetchDiscordApi<Guild>(`/guilds/${guildId}`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`
		}
	});
	const guild = fetchedGuild.id ? (fetchedGuild as Guild) : null;
	if (!guild) throw redirect(301, PathNames.Manage);
	return {
		guild
	};
}) satisfies PageServerLoad;
