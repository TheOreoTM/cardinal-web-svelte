<script lang="ts">
	import RedirectPage from '$lib/components/RedirectPage.svelte';

	export let data;
</script>

{#if !data.loggedIn}
	<RedirectPage to="/" delay={5}>
		<h1>Something went wrong. Please try again.</h1>
		<p class="pt-2 text-center text-lg">
			Error: <span class="text-error">{data.error}</span>
		</p>
	</RedirectPage>
{:else}
	<RedirectPage delay={5} to="/manage">
		<h1>You have been logged in.</h1>
	</RedirectPage>
{/if}
