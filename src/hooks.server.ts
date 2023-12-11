// import { authenticateUser } from '$lib/server/discord';
// import type { Handle } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	event.locals.user = await authenticateUser(event);
// 	if (event.url.pathname.startsWith('/manage')) {
// 		if (!event.locals.user) {
// 			throw redirect(302, '/api/discord/login');
// 		}
// 	}
// 	return resolve(event);
// };

import { handleGuildsRoute } from './hooks/guilds';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { ApiClient } from '$lib/ApiClient';

const protectedRoutes = ['/manage'];

export const handleAll: Handle = async ({ event, resolve }) => {
	const cookie = event.cookies.get(env.PUBLIC_COOKIE!);
	if (!cookie) {
		if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
			return new Response(undefined, {
				status: 302,
				headers: { location: '/oauth/discord/login' }
			});
		}

		return resolve(event);
	}

	try {
		const userRes = await ApiClient.fetchUser();
		console.log('userRes');
		console.log(userRes);

		event.locals.user = userRes.user
			? { ...userRes.user } //
			: undefined;

		if (event.url.pathname.startsWith('/manage')) {
			return handleGuildsRoute({ event, resolve });
		}
	} catch (err: unknown) {
		console.log(err);
		event.locals.user = undefined;
		event.locals.guilds = undefined;
		event.locals.guild = undefined;
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleAll);
