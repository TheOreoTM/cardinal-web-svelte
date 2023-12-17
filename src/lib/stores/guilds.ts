import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { FlattenedGuild } from '$lib/utils/api/types';

type GuildsStore = Writable<Map<string, FlattenedGuild>>;

const GUILDS_KEY = 'Guilds';

export function createGuildsContext(guilds = new Map<string, FlattenedGuild>()): GuildsStore {
	const store = writable(guilds);
	return setContext(GUILDS_KEY, store);
}

export function getGuildsContext(): GuildsStore {
	const store = getContext<GuildsStore | undefined>(GUILDS_KEY);

	if (!store) {
		throw Error('Please run `createGuildsContext` before trying to access the context.');
	}

	return store;
}

export function setGuildsContext(guilds = new Map<string, FlattenedGuild>()): void {
	const context = getGuildsContext();
	context.set(guilds);
}
