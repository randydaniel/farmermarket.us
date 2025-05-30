<script lang="ts">
	import { config } from '$lib/config';
	import Accordion from '$lib/components/ui/Accordion.svelte';

	const faqItems = [
		{
			title: 'Who is this template best suited for?',
			content:
				'Direx is perfect for anyone building a directory-style site—whether you’re listing local businesses, freelancers, services, events, or niche communities. It’s ideal for creators, startups, and agencies looking to launch fast.'
		},
		{
			title: 'Can I customize the layout and visuals?',
			content:
				'Yes. Direx is built for flexibility. You can easily customize colors, typography, spacing, and layouts to match your brand using your favorite design tools or directly in code.'
		},
		{
			title: 'Do I need coding experience to use this template?',
			content:
				'Not necessarily. Direx is designed with clean, well-organized code that’s beginner-friendly. Some basic HTML/CSS knowledge helps if you want to tweak things more deeply, but you don’t need to be an expert to get started.'
		},
		{
			title: 'Is this template mobile-friendly?',
			content:
				'Absolutely. Direx is fully responsive and designed to look great on all devices—from phones to desktops.'
		},
		{
			title: 'Can I use this for a client project or commercial site?',
			content:
				'Yes. Direx comes with a license that allows commercial use, so you can use it for personal sites, client projects, or full-scale businesses.'
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

<main
	class="container mx-auto max-w-[900px] px-4 py-12 xl:px-0 xl:py-24 dark:bg-slate-950 dark:text-slate-50"
>
	<!-- Header -->
	<h1 class="mb-4 text-4xl font-normal text-slate-950 dark:text-slate-50">
		Frequently Asked Questions
	</h1>

	<!-- FAQ Accordion -->
	<div class="prose prose-slate max-w-none">
		<Accordion items={faqItems} />
	</div>
</main>
