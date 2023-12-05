import type { DiscordUser } from '@lucia-auth/oauth/providers';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const userStore: Writable<DiscordUser | null> = localStorageStore('discordUser', null);
