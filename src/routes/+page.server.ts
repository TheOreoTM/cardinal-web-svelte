import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	locals.guild = undefined;
	return {};
}) satisfies PageServerLoad;
