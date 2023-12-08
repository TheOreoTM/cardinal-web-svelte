<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta title="Logging" guildName={data.guild.name} />

Logging: {data.guild.name}
