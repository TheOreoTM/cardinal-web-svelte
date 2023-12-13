<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const triggerModal = () => {
		modalStore.trigger({
			type: 'confirm',
			title: 'Please confirm',
			body: 'Are you sure you want to proceed',
			response: (r: boolean) => {
				r === true ? triggerToast('Changes saved successfully') : triggerToast('Changes reverted');
			}
		});
	};

	const triggerToast = (message?: string) => {
		toastStore.trigger({
			message: message ? message : 'Changes Saved Successfully',
			background: 'variant-ghost-primary	'
		});
	};
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
	<div class="flex items-center justify-between">
		Hello
		<button class="btn variant-filled-primary" on:click={() => triggerModal()}>Save changes</button>
	</div>
</div>
