<script lang="ts">
	import { enhance } from '$app/forms';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import type { SubmitFunction } from '@sveltejs/kit';
	import SettingsCard from './dashboard/SettingsCard.svelte';

	const toast = getExtendedToastStore();

	export let title: string;
	export let action: string | undefined = undefined;
	export let unsavedChanges: boolean;

	const handleSubmit: SubmitFunction = (event) => {
		if (!unsavedChanges) {
			event.cancel();
		}

		const data = Object.fromEntries(event.formData);
		const [key, value] = Object.entries(data)[0];
		console.log(key, value);
		event.formData.set('value', value);

		return async function ({ update, result }) {
			await update({ reset: false });
			if (result.type === 'success') {
				toast.success('Saved changes');
			} else {
				toast.error('Something went wrong when saving your changes.');
			}
		};
	};
</script>

<form method="post" {action} use:enhance={handleSubmit} class="flex">
	<SettingsCard {title} documentation>
		<slot />
		<svelte:fragment slot="footer">
			<button class="btn variant-filled-success" disabled={!unsavedChanges}> Save </button>
		</svelte:fragment>
	</SettingsCard>
</form>
