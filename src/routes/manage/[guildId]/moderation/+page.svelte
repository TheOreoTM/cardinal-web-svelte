<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import SelectOne from '$lib/components/SelectOne.svelte';
	import SettingsForm from '$lib/components/SettingsForm.svelte';
	import SettingsRow from '$lib/components/dashboard/SettingsRow.svelte';
	import Label from '$lib/components/forms/Label.svelte';
	import { SlideToggle, type AutocompleteOption } from '@skeletonlabs/skeleton';
	import { ChannelType } from 'discord-api-types/v10';

	export let data;

	let defaults = {
		enabled: false,
		antihoistEnabled: false,
		reportChannelId: undefined,
		moderatorRole: undefined,
		minageReq: 1,
		minageMessage: 'false'
	};

	const settings = {
		enabled: false,
		antihoistEnabled: false,
		reportChannelId: undefined,
		moderatorRole: undefined,
		minageReq: false,
		minageMessage: 'false'
	};

	let values: Partial<typeof defaults> = {
		...defaults
	};

	let uc = {
		module: false,
		antihoist: false,
		report: false,
		moderatorRole: false,
		minageReq: false,
		minageMessage: false
	};

	const modlogChannelOptions: AutocompleteOption<string>[] = data.channels
		? data.channels
				.filter((c) => c.type === ChannelType.GuildText)
				.sort((a, b) => a.position - b.position)
				.map((chn) => {
					return { label: chn.name ?? 'Unknown Channel', value: chn.id };
				})
		: [];

	const guildRoles: AutocompleteOption<string>[] = data.roles
		? data.roles
				.filter((r) => r.id !== data.guild.id)
				.sort((a, b) => b.position - a.position)
				.map((role) => {
					return { label: role.name ?? 'Unknown Role', value: role.id };
				})
		: [];
</script>

<Meta title="Moderation" guildName={data.guild.name} />

<section>
	<div class="space-y-6">
		<SettingsForm title="Moderation Module" action="?/module" unsavedChanges={uc.module}>
			<SlideToggle
				label="module-enabled"
				name="module-enabled"
				size="sm"
				value="true"
				bind:checked={values.enabled}
				on:change={() => {
					uc.module = defaults.enabled !== values.enabled;
				}}>{`${values.enabled ? 'Disable' : 'Enable'} Module`}</SlideToggle
			>
		</SettingsForm>

		<SettingsRow>
			<SettingsForm title="Modlog Channel" action="?/report" unsavedChanges={uc.report}>
				<p>Members in moderator roles will have access to Moderator commands.</p>
				<Label id="report" title="Modlog Channel">
					<SelectOne
						id="select-report"
						placeholder="Select Channel..."
						options={modlogChannelOptions}
						bind:selected={values.reportChannelId}
						onSelect={() => {
							uc.report = defaults.reportChannelId !== values.reportChannelId;
						}}
					/>
				</Label>
			</SettingsForm>
			<SettingsForm title="Moderator Role" action="?/modrole" unsavedChanges={uc.moderatorRole}>
				<p>Members in moderator roles will have access to Moderator commands.</p>
				<Label id="moderator-role" title="Moderator Roles">
					<SelectOne
						id="select-modrole"
						placeholder="Select Role..."
						options={guildRoles}
						bind:selected={values.moderatorRole}
						onSelect={() => {
							uc.moderatorRole = defaults.moderatorRole !== values.moderatorRole;
						}}
					/>
				</Label>
			</SettingsForm>
		</SettingsRow>
	</div>
</section>
