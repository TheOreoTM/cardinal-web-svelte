<script lang="ts">
	import type { LayoutData } from './$types';
	import { createCurrentGuildContext, createGuildsContext } from '$lib/stores';

	export let data: LayoutData;

	console.log('🚀 ~ file: +layout.svelte:6 ~ data:', data);

	createGuildsContext(data.guilds);
	createCurrentGuildContext();
</script>
