<script lang="ts">
	import { NavbarItems } from '$lib/utils/config';
	import { AppBar, Avatar, getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Menu2 } from '@steeze-ui/tabler-icons';
	import UserInfo from '$lib/components/auth/UserInfo.svelte';

	const drawerStore = getDrawerStore();
	function openSidebar() {
		const s: DrawerSettings = {
			bgDrawer: 'bg-surface-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-surface-500/50 via-surface-600/50 to-surface-900/50',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl'
		};
		drawerStore.open(s);
	}

	const items = NavbarItems;
</script>

<AppBar shadow="shadow-2xl" slotFooter="bg-black p-4">
	<svelte:fragment slot="lead">
		<button class="btn md:hidden" type="button" on:click={openSidebar}>
			<Icon src={Menu2} theme="solid" class="w-10 h-10" />
		</button>

		<!-- Logo -->
		<a class="btn hidden md:inline" href="/"><Avatar src="/cardinal.png" width="w-14" /></a>
		<strong class="text-xl uppercase">Cardinal</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#each items as item}
			<a href={item.href} target={item.newTab ? '_blank' : '_parent'}>
				<button class="hidden md:inline btn variant-ghost-tertiary" type="button"
					>{item.title}</button
				>
			</a>
		{/each}
		<UserInfo />
	</svelte:fragment>
</AppBar>
