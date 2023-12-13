import type { LayoutServerLoad } from './[guildId]/$types';

export const load: LayoutServerLoad = ({ locals }) => {
	return { guilds: locals.guilds };
};
