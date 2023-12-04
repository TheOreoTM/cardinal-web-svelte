import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { DiscordUser } from '@lucia-auth/oauth/providers';

export const user = writable(null as DiscordUser | null, (set) => {
	if (!browser) return;
	const user = localStorage.getItem('user');
	if (user == null) return set(null);
	const parsedUser = JSON.parse(user);
	set(parsedUser);
});
