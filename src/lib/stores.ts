import { writable } from 'svelte/store';
import type { Guild } from './types';

export const currentGuild = writable<Guild | null>(null);
