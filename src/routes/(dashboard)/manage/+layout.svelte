<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';

	import { createCurrentGuildContext, createGuildsContext } from 'stores';
	import type { LayoutData } from './[guildId]/$types';

	export let data: LayoutData;

	createGuildsContext(data.guilds);
	createCurrentGuildContext();
</script>
