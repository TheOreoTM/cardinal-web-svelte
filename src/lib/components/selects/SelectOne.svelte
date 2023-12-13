<script lang="ts" generics="T">
	import {
		popup,
		type AutocompleteOption,
		type PopupSettings,
		Autocomplete
	} from '@skeletonlabs/skeleton';

	export let placeholder: string | undefined;
	export let selected: string | undefined;
	export let options: Option<T>[];
	export let id: string;
	export let onSelect: () => void;

	const randomInt = Math.random();
	// Local
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: `popup-${randomInt}`,
		placement: 'bottom'
	};

	type Option<T> = AutocompleteOption<string, T>;

	function onPopupSelect(event: CustomEvent<Option<T>>): void {
		selected = event.detail.value;
		onSelect();
	}
</script>

<div class="text-token w-full max-w-sm space-y-2">
	<input
		class="input autocomplete"
		type="search"
		name={id}
		bind:value={selected}
		placeholder={placeholder ? placeholder : 'Select...'}
		use:popup={popupSettings}
	/>
	<div
		data-popup={`popup-${randomInt}`}
		class="card z-[1000] w-full max-w-sm max-h-48 p-4 overflow-y-auto"
		tabindex="-1"
	>
		<Autocomplete bind:input={selected} {options} on:selection={onPopupSelect} />
	</div>
</div>
