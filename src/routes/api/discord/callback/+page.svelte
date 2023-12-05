<script lang="ts">
	import RedirectPage from '$lib/components/RedirectPage.svelte';
	import { onMount } from 'svelte';

	export let data;
</script>

Hi, youre {data.loggedIn}

<!-- {#if !data.loggedIn}
	{console.log('not logged in')}
	<RedirectPage to="/" delay={10}>
		<h1>Something went wrong. Please try again.</h1>
		<p class="pt-2 text-center text-lg">
			Error: <span class="text-error">{data.error}</span>
		</p>
	</RedirectPage>
{:else}
	{console.log('logged in')}
	Yo bro u logged in?? thats crazzyyy
{/if} -->
