import { getContext, setContext } from 'svelte';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
import type { TransformedLoginData } from '$lib/utils/api/types';

type UserStore = Writable<TransformedLoginData['user'] | undefined>;

const USER_KEY = 'User';

export function createUserContext(
	user: TransformedLoginData['user'] | undefined = undefined
): UserStore {
	const store = localStorageStore(USER_KEY, user);

	return setContext(USER_KEY, store);
}

export function getUserContext(): UserStore {
	const store = getContext<UserStore | undefined>(USER_KEY);

	if (!store) {
		throw Error('Please run `createUserContext` before trying to access the context.');
	}

	return store;
}

export function setUserContext(user: TransformedLoginData['user'] | undefined = undefined): void {
	const context = getUserContext();
	context.set(user);
}
