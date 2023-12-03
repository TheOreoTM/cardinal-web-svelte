<script lang="ts">
	import { PathNames } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	onMount(() => {
		localStorage.removeItem('token');
		location.pathname = PathNames.index;
	});
</script>
