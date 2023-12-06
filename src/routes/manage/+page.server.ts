import { getOrRefreshToken } from '$lib/server/discord';
import { fetchBotGuilds, fetchUserGuilds } from '$lib/utils/api/discord';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PathNames } from '$lib/utils/constants';

export const load = (async (event) => {
	const accessToken = await getOrRefreshToken(event);
	if (!accessToken) throw redirect(301, PathNames.Login);
	const userGuilds = await fetchUserGuilds(accessToken);
	const userManageableGuilds = userGuilds.filter((g) => (Number(g.permissions) & 0x20) === 0x20);
	const botGuilds = await fetchBotGuilds();
	const mutualGuilds = userManageableGuilds.filter((g) => botGuilds.some((bg) => g.id === bg.id));
	const unmutualGuilds = userManageableGuilds.filter(
		(guild) => !mutualGuilds.some((mguild) => mguild.id === guild.id)
	);

	return {
		user: event.locals.user,
		mutualGuilds,
		unmutualGuilds
	};
}) satisfies PageServerLoad;
