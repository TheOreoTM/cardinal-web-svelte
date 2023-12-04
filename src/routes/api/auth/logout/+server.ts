import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { userStore } from '$lib/stores';
import { get } from 'svelte/store';
import { PathNames } from '$lib/utils/constants';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		await auth.invalidateSession(session.sessionId);

		locals.auth.setSession(null);

		await auth.deleteDeadUserSessions(session.user.userId);

		userStore.set(null);

		throw redirect(303, PathNames.index);
	}

	userStore.set(null);

	throw redirect(303, PathNames.index);
};
