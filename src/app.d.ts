// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Guild, Guilds } from '$lib/types';
import type { OauthFlattenedGuild, TransformedLoginData } from '$lib/utils/api/types';

declare global {
	namespace App {
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
		// interface Error {}
		interface Locals {
			user: TransformedLoginData['user'] | undefined;
			guilds: Guilds | undefined;
			guild: Guild | undefined;
		}

		// interface PageData {}
	}
}

export {};
