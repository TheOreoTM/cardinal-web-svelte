<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta title="Utility" guildName={data.guild.name} />

Utility: {data.guild.name}
