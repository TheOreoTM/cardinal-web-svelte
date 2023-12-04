import type { DiscordUser } from '@lucia-auth/oauth/providers';
import { writable, type Writable } from 'svelte/store';

export const userStore: Writable<DiscordUser | null> = writable(null);
