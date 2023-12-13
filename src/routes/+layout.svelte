<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Dependency: Floating UI
	import { storePopup, Drawer } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// Components & Utilities
	import { AppShell, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/navigation/Navbar.svelte';
	import NavbarDropdown from '$lib/components/navigation/NavbarDropdown.svelte';
	import DashboardSidebar from '$lib/components/dashboard/DashboardSidebar.svelte';
	import type { LayoutServerData } from './$types';
	import { createUserContext } from '$lib/stores';

	export let data: LayoutServerData;

	initializeStores();
	createUserContext(data.user);
</script>

<Toast position="br" />
<Modal />
<Drawer>
	<NavbarDropdown /></Drawer
>

<AppShell>
	<!-- Header  -->
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>
	<!-- Page Content -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<!-- Sidebar Left  -->
	<svelte:fragment slot="sidebarLeft">
		<DashboardSidebar />
	</svelte:fragment>
	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
	<!-- ---- / ---- -->
</AppShell>
