import type { ClientState } from '$lib/client';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Guild, User } from './types';

export const user = writable(null as User | null, (set) => {
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

export const token = writable(null as string | null);

token.subscribe((token) => {
	if (!browser) return;
	if (token == null) return;

	state.set({ loggedIn: true });
	window.localStorage.setItem('token', token);
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

export const state = writable({ loggedIn: false } as ClientState);
