<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta title="Settings" guildName={data.guild.name} />

Setting: {data.guild.name}
