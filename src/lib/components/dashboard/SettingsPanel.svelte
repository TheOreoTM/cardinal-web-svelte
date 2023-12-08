<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import DocumentationModal from '../modals/DocumentationModal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getExtendedToastStore } from '$lib/utils/toast';
	import { enhance } from '$app/forms';

	export let title: string;
	export let documentation = false;
	export let action: string | undefined = undefined;
	export let unsavedChanges: boolean;

	const modalStore = getModalStore();
	const toast = getExtendedToastStore();

	const modal: ModalSettings = {
		type: 'component',
		component: {
			ref: DocumentationModal
		}
	};

	const handleSubmit: SubmitFunction = (event) => {
		if (!unsavedChanges) {
			event.cancel();
		}

		return async function ({ update, result }) {
			await update({ reset: false });

			if (result.type === 'success') {
				toast.success('Saved changes');
			} else {
				toast.error('Something went wrong when saving your changes.');
			}
		};
	};

	function handleClick() {
		modalStore.trigger(modal);
	}
</script>

<!-- DO NOT USE THIS USE SettingsForm -->
<form method="post" {action} use:enhance={handleSubmit} class="flex">
	<div class="card !bg-intial flex flex-col shadow-md w-full justify-between">
		<header class="card-header flex items-center gap-2 text-2xl mb-2">
			{title}
			{#if documentation}
				<button
					type="button"
					class="badge-icon variant-filled cursor-pointer !rounded-full"
					on:click={handleClick}
					on:keydown={handleClick}
				>
					<i class="fa-solid text-base fa-question"></i>
				</button>
			{/if}
		</header>
		<hr class="w-[96%] mx-auto" />
		<div class="p-4 space-y-4">
			<slot />
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<button class="btn variant-filled-success" disabled={!unsavedChanges}> Save </button>
		</footer>
	</div>
</form>
