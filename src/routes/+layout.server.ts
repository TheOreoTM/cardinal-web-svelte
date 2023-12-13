import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	console.log('locals', locals.user);
	return { user: locals.user };
};
