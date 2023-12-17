<script lang="ts">
	import type { LayoutData } from './$types';
	import { createCurrentGuildContext, createGuildsContext } from 'stores';

	export let data: LayoutData;

	createGuildsContext(data.guilds);
	createCurrentGuildContext();
</script>
