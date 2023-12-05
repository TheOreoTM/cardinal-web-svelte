<script lang="ts">
	export let data;
</script>

HI UWU {data.user?.display_name ?? 'No one?'}
<!-- {#if activeGuilds !== null}
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
{/if} -->
