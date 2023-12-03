import { get } from 'svelte/store';
import type { LayoutServerLoad } from './$types';
import { user } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const load = (async () => {
	const userStore = JSON.parse(localStorage.getItem('user') ?? 'null') as User | null;
	if (!userStore) {
		console.log('No');
		throw redirect(303, '/login');
	}
	return {};
}) satisfies LayoutServerLoad;
