<script lang="ts">
	import type { DiscordUser } from '$lib/types';
	import { PathNames } from '$lib/utils/constants';
	import { getUserAvatarUrl } from '$lib/utils/functions';
	import { AppBar, Avatar, getDrawerStore } from '@skeletonlabs/skeleton';

	export let user: DiscordUser | null = null;
	export let items: { title: string; href: string }[] = [];

	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
			<span>
				<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
					<rect width="100" height="20" />
					<rect y="30" width="100" height="20" />
					<rect y="60" width="100" height="20" />
				</svg>
			</span>
		</button>
		<a class="btn" href="/"><Avatar src="/cardinal.png" width="w-14" /></a>
		<strong class="text-xl uppercase">Cardinal</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#each items as item}
			<a class="btn" href={item.href}>
				{item.title}
			</a>
		{/each}
		{#if user !== null}
			<a href={PathNames.logout}>
				<Avatar width="w-14" src={getUserAvatarUrl(user?.id ?? '0', user?.avatar ?? null)} />
			</a>
		{:else}
			<a href={PathNames.login}
				><button class="btn variant-ghost-primary" type="button">Login</button></a
			>
		{/if}
	</svelte:fragment>
</AppBar>
