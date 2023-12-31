import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import type {
	FlattenedGuild,
	OauthFlattenedGuild,
	TransformedLoginData
} from '$lib/utils/api/types';
import { PathNames } from '$lib/utils/constants';
import { BASE_CARDINAL_API_URL } from '$env/static/private';
import { ApiClient } from '$lib/ApiClient';
import type { User } from 'discord.js';

export const handleGuildsRoute: Handle = async ({ event, resolve }) => {
	const cookie = event.cookies.get(env.PUBLIC_COOKIE!);
	if (!cookie || !event.locals.user) {
		return new Response(undefined, {
			status: 302,
			headers: { location: PathNames.Login }
		});
	}

	const response = await event.fetch(`${BASE_CARDINAL_API_URL}/users/@me`, {
		credentials: 'include',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const userRes = (await response.json()) as { user: User; guilds: FlattenedGuild[] };
	const guildsRes = userRes.guilds;

	const transformedGuilds = guildsRes ?? [];
	const guilds = new Map<string, FlattenedGuild>();
	for (const guild of transformedGuilds) {
		guilds.set(guild.id, { ...guild });
	}

	event.locals.guilds = guilds;

	if (event.params.guildId) {
		const guild = guilds.get(event.params.guildId);

		if (!guild) {
			return new Response(undefined, {
				status: 302,
				headers: { location: '/manage' }
			});
		}

		event.locals.guild = guild;
	}

	return resolve(event);
};

// const fetchUserGuilds = async () => {

// }
