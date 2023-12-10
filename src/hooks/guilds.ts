import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type { OauthFlattenedGuild } from '$lib/utils/api/types';
import { PathNames } from '$lib/utils/constants';

export const handleGuildsRoute: Handle = async ({ event, resolve }) => {
	const cookie = event.cookies.get(env.PUBLIC_COOKIE!);
	if (!cookie || !event.locals.user) {
		return new Response(undefined, {
			status: 302,
			headers: { location: PathNames.Login }
		});
	}

	const transformedGuilds = event.locals.guilds ?? [];
	const guilds = new Map<string, OauthFlattenedGuild>();
	for (const guild of transformedGuilds) {
		guilds.set(guild.id, { ...guild });
	}

	if (event.params.guildId) {
		const guild = guilds.get(event.params.guildId);

		if (!guild) {
			return new Response(undefined, {
				status: 302,
				headers: { location: '/guilds' }
			});
		}

		event.locals.guild = guild;
	}

	return resolve(event);
};
