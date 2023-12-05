import { authenticateUser } from '$lib/server/discord';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);
	if (event.url.pathname.startsWith('/manage')) {
		if (!event.locals.user) {
			throw redirect(302, '/api/discord/login');
		}
	}
	return resolve(event);
};
