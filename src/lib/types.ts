export type Guild = {
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
	avatar: string;
	email: string;
	verified: boolean;
	flags: number;
	premium_type: number;
	public_flags: number;
	mfa_enabled: boolean;
	locale: string;
	accent_color: string;
	banner_color: string;
	banner: string;
	avatar_decoration: string;
	display_name: string;
};

export type ApiPath = `discord/guilds/${string}` | 'oauth/callback' | 'status';
