import { writable } from 'svelte/store';
import type { TransformedLoginData, OauthFlattenedGuild } from './utils/api/types';

export const currentGuild = writable<OauthFlattenedGuild | undefined>(undefined);
export const activeUser = writable<TransformedLoginData['user'] | undefined>(undefined);
export const userGuilds = writable<TransformedLoginData['transformedGuilds'] | undefined>(
	undefined
);
