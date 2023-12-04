import { discordAuth } from '$lib/server/oauth';
import type { RequestHandler } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { get } from 'svelte/store';
import { userStore } from '$lib/stores';

export const GET: RequestHandler = async ({ request, cookies, locals }) => {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('state');
	if (state !== storedState || code === null) {
		throw fail(400, { message: 'could not login user' });
	}
	const { discordUser, getExistingUser, createUser } = await discordAuth.validateCallback(code);
	const getUser = async () => {
		const existingUser = await getExistingUser();
		if (existingUser) return existingUser;
		return await createUser({
			attributes: {
				discordId: discordUser.id,
				username: discordUser.username
			}
		});
	};
	const authUser = await getUser();
	const session = await auth.createSession({
		userId: authUser.userId,
		attributes: {}
	});
	locals.auth.setSession(session);
	userStore.set(discordUser);
	console.log(get(userStore));
	throw redirect(302, '/');
};
