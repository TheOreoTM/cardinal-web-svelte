<script lang="ts">
	import { Autocomplete, InputChip, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	let inputChip = '';
	let inputChipList: string[] = ['vanilla', 'chocolate'];
	const flavorOptions: AutocompleteOption[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];
	function onInputChipSelect(event: CustomEvent<AutocompleteOption>): void {
		console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value as string) === false) {
			inputChipList = [...inputChipList, event.detail.value as string];
			inputChip = '';
		}
	}
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<div use:popup={popupSettings}>
	<InputChip bind:input={inputChip} bind:value={inputChipList} name="chips" />
</div>

<div
	class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
	tabindex="-1"
	data-popup="popupAutocomplete"
>
	<Autocomplete
		bind:input={inputChip}
		options={flavorOptions}
		denylist={inputChipList}
		on:selection={onInputChipSelect}
	/>
</div>
