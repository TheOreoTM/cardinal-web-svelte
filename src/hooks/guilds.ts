import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { fetchBotGuilds, fetchGuild, fetchUserGuilds } from '$lib/utils/api/discord';
import { getOrRefreshToken } from '$lib/server/discord';
import { PathNames } from '$lib/utils/constants';

export const handleGuildsRoute: Handle = async ({ event, resolve }) => {
	const accessToken = await getOrRefreshToken(event);
	if (!accessToken) {
		return new Response(undefined, {
			status: 302,
			headers: { location: PathNames.Login }
		});
	}

	const userGuilds = await fetchUserGuilds(accessToken);

	if (!userGuilds) {
		event.locals.guilds = { mutual: [], unmutual: [] };
	}

	const userManageableGuilds = userGuilds.filter((g) => (Number(g.permissions) & 0x20) === 0x20);
	const botGuilds = await fetchBotGuilds();
	const mutualGuilds = userManageableGuilds.filter((g) => botGuilds.some((bg) => g.id === bg.id));
	const unmutualGuilds = userManageableGuilds.filter(
		(guild) => !mutualGuilds.some((mguild) => mguild.id === guild.id)
	);

	event.locals.guilds = { mutual: mutualGuilds, unmutual: unmutualGuilds };

	if (event.params.guildId) {
		const guild = await fetchGuild(event.params.guildId);
		if (!guild) {
			console.log('No guild');
			return new Response(undefined, {
				status: 302,
				headers: { location: PathNames.Manage }
			});
		}

		event.locals.guild = guild;
	}

	return resolve(event);
};
