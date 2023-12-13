<script lang="ts">
	import { currentGuild } from '$lib/stores.js';

	export let data;

	$currentGuild = data.guild;
</script>

{JSON.stringify(data.guild)}
{data.guild?.name}
