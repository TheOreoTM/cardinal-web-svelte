import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	console.log('locals.guild', locals.guilds);
	return { guilds: locals.guilds };
};
