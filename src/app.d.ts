// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DiscordUser, Guild, PartialGuild } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: DiscordUser | null;
			guild: Guild | null;
			guilds: { mutual: PartialGuild[]; unmutual: PartialGuild[] } | null;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
