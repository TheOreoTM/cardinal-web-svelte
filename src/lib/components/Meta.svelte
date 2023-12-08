<script lang="ts">
	import { PUBLIC_BASE_WEB_URL } from '$env/static/public';
	import { MetaTags, type AdditionalRobotsProps } from 'svelte-meta-tags';

	export let title: string;
	export let guildName = '';
	export let disableTemplate = false;
	export let description = 'A multi-feature Discord bot.';
	export let logo = '/cardinal.png';
	export let url = PUBLIC_BASE_WEB_URL;
	export let blockRobots = false;

	const robotsProps: AdditionalRobotsProps = blockRobots
		? {}
		: {
				noarchive: true,
				nosnippet: true,
				notranslate: true,
				noimageindex: true,
				maxSnippet: -1,
				maxImagePreview: 'none',
				maxVideoPreview: -1
		  };
</script>

<MetaTags
	title={guildName ? `${title} | ${guildName}` : title}
	titleTemplate={disableTemplate ? undefined : '%s | Cardinal Bot'}
	{description}
	canonical={url}
	openGraph={{
		type: 'website',
		url,
		title,
		description,
		images: [{ url: logo, alt: 'Cardinal icon' }],
		siteName: 'Cardinal Bot'
	}}
	twitter={{
		cardType: 'summary',
		title,
		description,
		image: logo,
		imageAlt: 'Cardinal icon'
	}}
	robots={blockRobots ? 'noindex,nofollow' : undefined}
	additionalRobotsProps={blockRobots ? undefined : robotsProps}
/>

<svelte:head>
	<meta name="theme-color" data-react-helmet="true" content="#006BFC" />
</svelte:head>
