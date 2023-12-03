import type { APIGuild, APIUser } from 'discord-api-types/v10';

export type Guild = APIGuild;

export type ApiPath = `discord/guilds/${string}` | 'oauth/callback' | 'status';
