import type { DiscordUser } from '$lib/types';

export const load = ({ locals }): { user?: DiscordUser } => {
	if (!locals.user) return {};
	return {
		user: locals.user
	};
};
