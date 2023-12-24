<script lang="ts">
	import type { LayoutData } from './$types';
	import { createCurrentGuildContext, createGuildsContext } from '$lib/stores';

	export let data: LayoutData;

	createGuildsContext(data.guilds);
	createCurrentGuildContext();
</script>
