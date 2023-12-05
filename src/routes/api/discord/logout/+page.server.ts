import { deleteCookies } from '$lib/utils/api/discord';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	deleteCookies(cookies);
	return {};
};
