import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.auth.validate();
	const user = session?.user;
	return {
		user
	};
}) satisfies LayoutServerLoad;
