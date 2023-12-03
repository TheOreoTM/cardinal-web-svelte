<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		Toast,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	initializeStores();

	// Dependency: Floating UI
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import SideBar from '$lib/components/SideBar.svelte';
	import { oauthURL } from '$lib/utils/constants';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<Toast position="tr" />
<Modal />
<Drawer>
	<SideBar />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<a class="btn" href="/"><Avatar src="/cardinal.png" width="w-14" /></a>
				<strong class="text-xl uppercase">Cardinal</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Avatar initials="JD" width="w-10" background="bg-primary-500" />
				<a href={oauthURL.toString()}
					><button class="btn variant-ghost-primary" type="button">Login</button></a
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- <SideBar /> -->
	</svelte:fragment>
	<!-- Router Slot -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<!-- ---- / ---- -->
</AppShell>
