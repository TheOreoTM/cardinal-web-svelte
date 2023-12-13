import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { OauthFlattenedGuild } from '$lib/utils/api/types';

type CurrentGuildStore = Writable<OauthFlattenedGuild | undefined>;

const CURRENT_GUILD_KEY = 'CurrentGuild';

export function createCurrentGuildContext(
	value: OauthFlattenedGuild | undefined = undefined
): CurrentGuildStore {
	const store = writable(value);

	return setContext(CURRENT_GUILD_KEY, store);
}

export function getCurrentGuildContext(): CurrentGuildStore {
	const store = getContext<CurrentGuildStore | undefined>(CURRENT_GUILD_KEY);

	if (!store) {
		throw Error('Please run `createCurrentGuildContext` before trying to access the context.');
	}

	return store;
}

export function setCurrentGuildContext(guild: OauthFlattenedGuild | undefined = undefined): void {
	const context = getCurrentGuildContext();
	context.set(guild);
}
