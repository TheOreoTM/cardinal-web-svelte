<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { getUserContext } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { getUserAvatarUrl } from '$lib/utils/functions';

	let settings: PopupSettings = {
		event: 'click',
		target: 'userInfoMenu',
		middleware: {
			offset: 20
		}
	};

	let storeUser = getUserContext();

	$: avatar = getUserAvatarUrl($storeUser?.id ?? '0', $storeUser?.avatar ?? null);

	function handleLogin() {
		return goto('/oauth/login');
	}

	function handleLogout() {
		return goto('/oauth/logout');
	}
</script>

{#if $storeUser}
	<button use:popup={settings}>
		<img src={avatar} alt="User avatar" class="w-12 h-12 rounded-full" />
	</button>

	<div class="card variant-filled-surface p-2 w-48" data-popup="userInfoMenu">
		<button class="btn hover:variant-soft-primary w-full" on:click={handleLogout}>Logout</button>
	</div>
{:else}
	<button class="btn variant-ghost-primary w-full" on:click={handleLogin}>Login</button>
{/if}
