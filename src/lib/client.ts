import { DISCORD_API_URL, PathNames } from './utils/constants';
import type { Guild, User } from './types';

export class AuthorizationError extends Error {
	constructor() {
		super(
			'Could not make an API request to the Discord server, because authorization token is missing or is invalid'
		);
	}
}

export class RateLimitingError extends Error {
	constructor() {
		super(
			'Could not make an API request to the Discord server, because you are being rate limited'
		);
	}
}

export const logout = (location: Location) => {
	location.pathname = PathNames.logout;
};

export interface ClientState {
	loggedIn: boolean;
}

export class Client {
	constructor(public readonly token: string) {}

	async fetch(url: string): Promise<Response> {
		const response = await fetch(url, {
			headers: {
				authorization: `Bearer ${this.token}`
			}
		});

		const json = await response.clone().json();

		if (response.status == 401) throw AuthorizationError;
		else if (json.code == 4008) throw RateLimitingError;

		return response;
	}

	async fetchUser(): Promise<User> {
		const response = await this.fetch(`${DISCORD_API_URL}/users/@me`);

		return response.json();
	}

	async fetchGuilds(): Promise<Array<Guild>> {
		const response = await this.fetch(`${DISCORD_API_URL}/users/@me/guilds`);

		return response.json();
	}
}
