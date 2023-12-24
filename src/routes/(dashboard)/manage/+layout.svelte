<script lang="ts">
	import { createCurrentGuildContext, createGuildsContext } from 'stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let guilds = createGuildsContext(data.guilds);
	createCurrentGuildContext();
</script>

<slot />
