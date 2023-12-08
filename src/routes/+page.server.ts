import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	locals.guild = null;
	return {
		user: locals.user
	};
}) satisfies PageServerLoad;
