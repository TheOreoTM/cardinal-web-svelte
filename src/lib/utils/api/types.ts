import type { LoginData } from '@sapphire/plugin-api';
import type {
	ChannelType,
	GuildChannelType,
	Snowflake,
	ThreadChannelType
} from 'discord-api-types/v10';
import type { Guild, PermissionOverwrites } from 'discord.js';

export type ApiPath =
	| `discord/guilds/${Snowflake}`
	| 'oauth/callback'
	| 'oauth/refresh'
	| 'status'
	| 'users/@me';

export interface TransformedLoginData extends LoginData {
	transformedGuilds?: OauthFlattenedGuild[];
}

interface FlattenedGuild
	extends Pick<
		Guild,
		| 'afkChannelId'
		| 'afkTimeout'
		| 'applicationId'
		| 'approximateMemberCount'
		| 'approximatePresenceCount'
		| 'available'
		| 'banner'
		| 'defaultMessageNotifications'
		| 'description'
		| 'widgetEnabled'
		| 'explicitContentFilter'
		| 'features'
		| 'icon'
		| 'id'
		| 'joinedTimestamp'
		| 'mfaLevel'
		| 'name'
		| 'ownerId'
		| 'partnered'
		| 'preferredLocale'
		| 'premiumSubscriptionCount'
		| 'premiumTier'
		| 'splash'
		| 'systemChannelId'
		| 'vanityURLCode'
		| 'verificationLevel'
		| 'verified'
	> {
	channels: FlattenedGuildChannel[];

	emojis: FlattenedEmoji[];

	manageable: boolean;

	permissions?: number;

	roles: FlattenedRole[];

	cardinalIsIn: boolean;
}

interface FlattenedEmoji {
	animated: boolean;

	available: boolean;

	id: string;

	managed: boolean;

	name: string;

	require_colons: boolean;

	roles: any[];
}

export interface FlattenedRole {
	color: number;

	guildId: string;

	hoist: boolean;

	id: string;

	managed: boolean;

	mentionable: boolean;

	name: string;

	permissions: string;

	rawPosition: number;
}

export interface FlattenedChannel {
	createdTimestamp: number;

	id: string;

	type: ChannelType;
}

export interface FlattenedGuildChannel extends FlattenedChannel {
	guildId: string;

	name: string;

	parentId: string | null;

	permissionOverwrites: [string, PermissionOverwrites][];

	rawPosition: number;

	type: GuildChannelType;
}

export interface FlattenedNewsChannel extends FlattenedGuildChannel {
	type: ChannelType.GuildAnnouncement;

	nsfw: boolean;

	topic: string | null;
}

export interface FlattenedTextChannel extends FlattenedGuildChannel {
	nsfw: boolean;

	rateLimitPerUser: number;

	topic: string | null;

	type: ChannelType.GuildText;
}

export interface FlattenedThreadChannel
	extends Pick<FlattenedGuildChannel, 'id' | 'createdTimestamp'> {
	archived: boolean;

	archivedTimestamp: number | null;

	guildId: string;

	name: string;

	parentId: string | null;

	permissionOverwrites: [string, PermissionOverwrites][];

	rateLimitPerUser: number | null;

	rawPosition: number | null;

	type: ThreadChannelType;
}

export interface FlattenedNewsThreadChannel extends FlattenedChannel {
	type: ChannelType.AnnouncementThread;
}

export interface FlattenedPublicThreadChannel extends FlattenedChannel {
	type: ChannelType.PublicThread;
}

export interface FlattenedPrivateThreadChannel extends FlattenedChannel {
	type: ChannelType.PrivateThread;
}

export interface FlattenedVoiceChannel extends FlattenedGuildChannel {
	type: ChannelType.GuildVoice;

	bitrate: number;

	userLimit: number;
}

export interface FlattenedDMChannel extends FlattenedChannel {
	type: ChannelType.DM;

	recipient: string;
}

interface FlattenedUser {
	avatar: string | null;

	discriminator: string;

	flags: number;

	id: string;

	locale: string;

	mfa_enabled: boolean;

	premium_type: number;

	public_flags: number;

	username: string;
}

export interface FlattenedMember {
	guildId: string;

	id: string;

	joinedTimestamp: number | null;

	premiumSinceTimestamp: number | null;

	roles: FlattenedRole[];

	user: FlattenedUser;
}

export interface FlattenedCommand {
	category: string;

	description: string;

	extendedHelp: ExtendedHelp;

	guarded: boolean;

	name: string;

	permissionLevel: number;

	preconditions: Preconditions;
}

export interface Preconditions {
	entries: PreconditionsEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionsEntry {
	entries: PreconditionEntryEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionEntryEntry {
	context: unknown;

	name: string;
}

interface ExtendedHelp {
	examples?: (null | string)[];

	explainedUsage?: [string, string][];

	extendedHelp?: string;

	possibleFormats?: [string, string][];

	reminder?: string;

	usages?: string[];
}

interface PartialOauthFlattenedGuild
	extends Omit<FlattenedGuild, 'joinedTimestamp' | 'ownerId' | 'region' | 'features'> {
	joinedTimestamp: FlattenedGuild['joinedTimestamp'] | null;

	ownerId: FlattenedGuild['ownerId'] | null;
}

export interface OauthFlattenedGuild extends PartialOauthFlattenedGuild {
	manageable: boolean;

	permissions: number;

	skyraIsIn: boolean;
}
