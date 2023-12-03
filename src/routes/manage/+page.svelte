<script lang="ts">
	import { Client } from '$lib/client';
	import { guilds, state, token, user } from '$lib/stores';
	import { oauthURL } from '$lib/utils/constants';
	import { getGuildAvatarUrl } from '$lib/utils/functions';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const getTokenFromURL = (url: string): string | null => {
		const fragment = new URLSearchParams(url.slice(1));
		return fragment.get('access_token');
	};

	const activeGuilds = $guilds;

	onMount(async () => {
		const tokenFromURL = getTokenFromURL(location.href) || localStorage.getItem('token');

		token.set(tokenFromURL);
		const savedToken = $token;

		window.history.replaceState({}, document.title, '/manage');
		// location.pathname = '/manage';

		if (savedToken == null) {
			location.assign(oauthURL.toString());
			return;
		}

		const client = new Client(savedToken);

		if ($user == null) {
			const fetchedUser = await client.fetchUser();
			user.set(fetchedUser);
		}

		if ($guilds == null) {
			const fetchedGuilds = await client.fetchGuilds();
			guilds.set(fetchedGuilds);
		}

		state.set({ loggedIn: true });
	});
</script>

{#if activeGuilds !== null}
	<div class="logo-cloud grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-0.5">
		{#each activeGuilds as guild}
			<a class="logo-item rounded-md" href={`/manage/${guild.id}`}>
				<div class="flex flex-col items-center">
					<Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} rounded="rounded-full" />
					<span class="mt-2 text-center">{guild.name}</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
