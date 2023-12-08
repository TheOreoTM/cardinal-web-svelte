import { fetchGuild, fetchGuildChannels, fetchGuildRoles } from '$lib/utils/api/discord';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PathNames } from '$lib/utils/constants';
import { currentGuild } from '$lib/stores';

export const load = (async ({ params }) => {
	const guild = await fetchGuild(params.guildId);
	const channels = await fetchGuildChannels(params.guildId);
	const roles = await fetchGuildRoles(params.guildId);
	currentGuild.set(guild);
	if (!guild) throw redirect(301, PathNames.Manage);

	return {
		guild,
		channels,
		roles
	};
}) satisfies LayoutServerLoad;
