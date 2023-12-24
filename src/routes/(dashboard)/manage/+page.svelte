<script lang="ts">
	import type { PageData } from './$types';
	import Meta from '$lib/components/Meta.svelte';
	import { Avatar, Noir } from '@skeletonlabs/skeleton';
	import { getGuildAvatarUrl } from '$lib/utils/functions';
	import { getGuildsContext } from 'stores';

	let data: PageData;
	let guilds = getGuildsContext();
</script>

<Noir />

<Meta title="Select a guild" />

{#if $guilds.values.length !== 0}
	<div class="logo-cloud grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-0.5">
		{#each $guilds.values() as guild}
			<a
				class="logo-item card-hover rounded-md relative overflow-hidden"
				href={`/manage/${guild.id}`}
			>
				<div class=" flex flex-col w-full items-center">
					<Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} rounded="rounded-full" />
					<span class="mt-2 text-center">{guild.name}</span>
				</div>
			</a>
		{/each}
		<!-- {#if unmutualGuilds}
			{#each unmutualGuilds as guild}
				<a
					class="logo-item card-hover rounded-md relative overflow-hidden"
					href={generateBotInvite({
						guildId: guild.id
					})}
				>
					<div class=" flex flex-col w-full items-center">
						<div class="flex flex-col items-center">
							<img
								class="avatar-image w-16 h-full rounded-full"
								src={getGuildAvatarUrl(guild.id, guild.icon)}
								use:filter={'#Noir'}
								alt="guild-icon"
							/>
							<span class="mt-2 text-center text-surface-400/50">{guild.name}</span>
						</div>
					</div>
				</a>
			{/each}
		{/if} -->
	</div>
{:else}
	{'No beans :('}
{/if}
