export type Guild = {
	id: string;
	name: string;
	icon: string;
	features: Array<string>;
	owner: boolean;
	permissions: string;
};

export type User = {
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

export type ApiPath = `discord/guilds/${string}` | 'oauth/callback' | 'status';
