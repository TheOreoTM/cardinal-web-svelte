<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import DocumentationModal from '../modals/DocumentationModal.svelte';

	export let title: string;
	export let documentation = false;

	const store = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: {
			ref: DocumentationModal
		}
	};

	function handleClick() {
		store.trigger(modal);
	}
</script>

<div class="card flex flex-col shadow-md w-full justify-between">
	<div>
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
	</div>
	<footer class="card-footer">
		<slot name="footer" />
	</footer>
</div>
