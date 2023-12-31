import type { FlattenedGuild } from '$lib/utils/api/types';
import type { APIChannel } from 'discord-api-types/v10';

export type PartialGuild = {
	id: string;
	name: string;
	icon: string;
	features: Array<string>;
	owner: boolean;
	permissions: string;
};

export type DiscordUser = {
	id: string;
	username: string;
	discriminator: string;
	avatar: null | string;
	accent_color: number;
	avatar_decoration: null | string;
	banner: null | string;
	banner_color: string;
	flags: number;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
};

export type Channel = APIChannel;

export type Guilds = Map<string, FlattenedGuild>;
export type Guild = FlattenedGuild;
