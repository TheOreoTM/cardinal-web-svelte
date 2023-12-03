<script>
	import { state } from '$lib/stores';
	import { oauthURL } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($state.loggedIn) {
			location.pathname = '/manage';
			return;
		}

		location.assign(oauthURL.toString());
	});
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page to acces dashboard" />
</svelte:head>
