<script lang="ts">
	import { page } from '$app/stores';
	import { currentGuild } from '$lib/stores';
	import { PathNames } from '$lib/utils/constants';
	import { getGuildAvatarUrl } from '$lib/utils/functions';
	import { AppRail, AppRailAnchor, Avatar } from '@skeletonlabs/skeleton';

	const modules: { name: string; link: string; icon: string }[] = [
		{ name: 'Setting', link: '/setting', icon: 'fa-gear' },
		{ name: 'Moderation', link: '/moderation', icon: 'fa-gavel' },
		{ name: 'Utility', link: '/utility', icon: 'fa-screwdriver-wrench' },
		{ name: 'Logs', link: '/logging', icon: 'fa-pen-to-square' }
	];

	let currentTile: number = 0;

	$: module = modules.find((m) => `/manage/${$currentGuild?.id}${m.link}` === $page.url.pathname);
	$: shouldDisplay = $page.url.pathname?.includes(`${PathNames.Manage}/`);
</script>

<AppRail class={shouldDisplay ? '' : 'hidden'}>
	<AppRailAnchor value={'home'} href={`/manage/${$currentGuild?.id}`} title="Home">
		<div class="flex justify-center">
			<Avatar
				src={getGuildAvatarUrl($currentGuild?.id ?? '0', $currentGuild?.icon ?? null)}
				width="w-12"
			/>
		</div>
	</AppRailAnchor>
	{#each modules as entry, i}
		<AppRailAnchor
			href={`/manage/${$currentGuild?.id}${entry.link}`}
			bind:group={currentTile}
			name="tile-{i}"
			value={i}
			title={entry.name}
			selected={entry === module}
		>
			<svelte:fragment slot="lead"><i class={`fa-solid text-2xl  ${entry.icon}`} /></svelte:fragment
			>
			<span>{entry.name}</span>
		</AppRailAnchor>
	{/each}
	<!-- Server Avatar  -->
	<svelte:fragment slot="trail"></svelte:fragment>
</AppRail>
