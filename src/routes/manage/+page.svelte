<script lang="ts">
	import { generateBotInvite, getGuildAvatarUrl } from '$lib/utils/functions.js';
	import { Avatar, Noir } from '@skeletonlabs/skeleton';

	export let data;
	const mutualGuilds = data.mutualGuilds;
	const unmutualGuilds = data.unmutualGuilds;
</script>

<Noir />

{#if mutualGuilds.length !== 0}
	<div class="logo-cloud grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-0.5">
		{#each mutualGuilds as guild}
			<a class="logo-item rounded-md" href={`/manage/${guild.id}`}>
				<div
					class="hover:scale-110 transform transition duration-500 flex flex-col w-full items-center"
				>
					<Avatar src={getGuildAvatarUrl(guild.id, guild.icon)} rounded="rounded-full" />
					<span class="mt-2 text-center">{guild.name}</span>
				</div>
			</a>
		{/each}
		{#each unmutualGuilds as guild}
			<a class="logo-item rounded-md" href={generateBotInvite({ guildId: guild.id })}>
				<div class="flex flex-col items-center">
					<img
						class="avatar-image w-16 h-full rounded-full"
						style="filter: url({'#Noir'})"
						src={getGuildAvatarUrl(guild.id, guild.icon)}
						alt="guild-icon"
					/>
					<span class="mt-2 text-center text-surface-400/50">{guild.name}</span>
				</div>
			</a>
		{/each}
	</div>
{:else}
	No beans
{/if}
