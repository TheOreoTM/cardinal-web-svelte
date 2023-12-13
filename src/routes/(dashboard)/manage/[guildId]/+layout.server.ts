import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/public';

export const load = (async ({ locals, cookies }) => {
	const cookie = cookies.get(env.PUBLIC_COOKIE!);
	if (!cookie || !locals.guild) {
		throw redirect(302, '/manage');
	}

	return {
		guild: locals.guild
	};
}) satisfies LayoutServerLoad;
