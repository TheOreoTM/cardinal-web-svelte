<script lang="ts">
	import { page } from '$app/stores';
	import { NavbarItems } from '$lib/utils/config';
	import { PathNames } from '$lib/utils/constants';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const items = NavbarItems;

	$: listboxItemActive = (href: string) =>
		$page.url.pathname?.includes(href) ? 'bg-primary-active-token' : '';
</script>

<section class="p-4 pb-20 space-y-4 overflow-y-auto">
	<!-- Title -->
	<p class="font-bold pl-4 text-2xl">Navigation</p>
	<!-- Nav List -->
	<nav class="list-nav">
		<ul>
			{#each items as { href, newTab, title }}
				<li>
					<a
						on:click={drawerStore.close}
						{href}
						target={newTab ? '_blank' : '_parent'}
						class={listboxItemActive(href)}
						data-sveltekit-preload-data="hover"
					>
						<span class="flex-auto">{@html title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</section>
