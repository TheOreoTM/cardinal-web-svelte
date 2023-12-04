import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import { prisma } from './prisma';
import { dev } from '$app/environment';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: prismaAdapter(prisma, {
		user: 'authUser',
		key: 'authKey',
		session: 'authSession'
	}),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: (userData) => {
		return {
			discordId: userData.discordId,
			username: userData.discordUsername
		};
	},
	middleware: sveltekit(),
	sessionExpiresIn: {
		activePeriod: 1000 * 60 * 60 * 24 * 7,
		idlePeriod: 1000 * 60 * 60 * 24 * 14
	}
});

export type Auth = typeof auth;
