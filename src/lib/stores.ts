import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { Guild } from './utils/types';
import type { LoginData } from '@sapphire/plugin-api';

export const user = writable(null as LoginData | null, (set) => {
	if (!browser) return;
	const user = localStorage.getItem('user');
	if (user == null) return set(null);
	const parsedUser = JSON.parse(user);
	set(parsedUser);
});

user.subscribe((user) => {
	if (!browser) return;
	if (user == null) return;

	localStorage.setItem('user', JSON.stringify(user));
});

export const guilds = writable(null as Array<Guild> | null, (set) => {
	if (!browser) return;
	const guilds = localStorage.getItem('guilds');
	if (guilds == null) return set(null);
	const parserGuilds = JSON.parse(guilds);
	set(parserGuilds);
});

guilds.subscribe((guilds) => {
	if (!browser) return;
	if (guilds == null) return;

	localStorage.setItem('guilds', JSON.stringify(guilds));
});
