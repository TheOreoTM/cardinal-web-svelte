<script lang="ts">
	import DashboardSidebar from '$lib/components/dashboard/DashboardSidebar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { setCurrentGuildContext } from '$lib/stores';
	import type { LayoutData } from './$types';
	import { createUnsavedChangesContext } from '$lib/stores/unsavedChanges';

	export let data: LayoutData;

	createUnsavedChangesContext();
	setCurrentGuildContext(data.guild);
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<DashboardSidebar />
	</svelte:fragment>

	<slot />
</AppShell>
