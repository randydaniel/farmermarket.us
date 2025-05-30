<script lang="ts">
	import { config } from '$lib/config';
	import Accordion from '$lib/components/ui/Accordion.svelte';

	const faqItems = [
		{
			title: 'What is included in this landing page template?',
			content:
				'This template includes a modern, responsive design optimized for AI agent products. It comes with pre-built sections for hero, features, integrations, pricing, testimonials, and a call-to-action. Easily customizable in Figma or your preferred builder.'
		},
		{
			title: 'Who is this template best suited for?',
			content:
				'This template includes a modern, responsive design optimized for AI agent products. It comes with pre-built sections for hero, features, integrations, pricing, testimonials, and a call-to-action. Easily customizable in Figma or your preferred builder.'
		},
		{
			title: 'Can I customize the layout and visuals?',
			content:
				'This template includes a modern, responsive design optimized for AI agent products. It comes with pre-built sections for hero, features, integrations, pricing, testimonials, and a call-to-action. Easily customizable in Figma or your preferred builder.'
		},
		{
			title: 'Do I need coding experience to use this template?',
			content:
				'This template includes a modern, responsive design optimized for AI agent products. It comes with pre-built sections for hero, features, integrations, pricing, testimonials, and a call-to-action. Easily customizable in Figma or your preferred builder.'
		},
		{
			title: 'Is this a one-time purchase or subscription?',
			content:
				'This template includes a modern, responsive design optimized for AI agent products. It comes with pre-built sections for hero, features, integrations, pricing, testimonials, and a call-to-action. Easily customizable in Figma or your preferred builder.'
		}
	];
</script>

<svelte:head>
	<title>FAQ | {config.siteName}</title>
	<meta
		name="description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>
	<meta
		name="keywords"
		content="FAQ, frequently asked questions, help, resources, directory, tools"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="FAQ | {config.siteName}" />
	<meta
		property="og:description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="FAQ | {config.siteName}" />
	<meta
		property="twitter:description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>
</svelte:head>

<main class="container mx-auto max-w-[900px] px-4 py-12 xl:px-0 xl:py-24">
	<!-- Header -->
	<h1 class="mb-4 text-4xl font-normal text-slate-950">Frequently Asked Questions</h1>

	<!-- FAQ Accordion -->
	<Accordion items={faqItems} />
</main>
