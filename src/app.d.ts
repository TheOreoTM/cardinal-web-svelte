// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { OauthFlattenedGuild, TransformedLoginData } from '$lib/utils/api/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: TransformedLoginData['user'] | undefined;
			guilds: TransformedLoginData['transformedGuilds'] | undefined;
			guild: OauthFlattenedGuild | undefined;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
