<script lang="ts" generics="T">
	import {
		popup,
		type AutocompleteOption,
		type PopupSettings,
		Autocomplete
	} from '@skeletonlabs/skeleton';

	// Local
	let inputPopup = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	type Option<T> = AutocompleteOption<string, T>;
	export let options: Option<T>[];

	function onPopupSelect(event: CustomEvent<Option<T>>): void {
		inputPopup = event.detail.label;
	}
</script>

<div class="text-token w-full max-w-sm space-y-2">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={inputPopup}
		placeholder="Search..."
		use:popup={popupSettings}
	/>
	<div
		data-popup="popupAutocomplete"
		class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
		tabindex="-1"
	>
		<Autocomplete bind:input={inputPopup} {options} on:selection={onPopupSelect} />
	</div>
</div>
