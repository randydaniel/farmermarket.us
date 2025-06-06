<script lang="ts">
	import { config } from '$lib/config';
	import Accordion from '$lib/components/ui/Accordion.svelte';

	const faqItems = [
		{
			title: `Where can I get Farmers Market vouchers?`,
			content: `<p>Farmer's Market vouchers are typically available through several programs:</p>
<ul class="my-2"><li class="mb-4"><strong>WIC Farmers' Market Nutrition Program (FMNP)</strong> - If you receive WIC benefits, you can get vouchers to use at participating farmers' markets. Contact your local WIC office to see if you're eligible and when vouchers are distributed (usually during summer months).</li>
<li class="mb-4"><strong>Senior Farmers' Market Nutrition Program</strong> - For adults 60 and older who meet income requirements. Check with your local Area Agency on Aging or senior center.</li>
<li class="mb-4"><strong>SNAP matching programs</strong> - Many farmers' markets offer programs that match your SNAP/EBT dollars, effectively doubling your purchasing power. Look for programs like "Double Up Food Bucks" or similar local initiatives.</li>
<li class="mb-4"><strong>Community organizations</strong> - Some nonprofits, food banks, or community health centers distribute farmers' market vouchers as part of nutrition programs.</li>
<li class="mb-4"><strong>Local government programs</strong> - Some cities or counties have their own farmers' market voucher programs for residents.</li></ul>
<p>To find what's available in your area, I'd recommend calling your local farmers' markets directly, contacting your county health department, or checking with 211 (dial 2-1-1) for information about local assistance programs. Many markets also have information about voucher programs on their websites or social media pages.</p>`
		},
		{
			title: `How to sell at a farmers market?`,
			content: `<p>Selling at a farmers market is a great way to reach local customers and support your community. Here are the typical steps:</p>
<ol class="my-2">
<li class="mb-2"><strong>Find a market:</strong> Research local farmers markets and review their vendor requirements. Each market may have its own rules, fees, and application process.</li>
<li class="mb-2"><strong>Apply:</strong> Submit an application to the market manager or through the market's website. You may need to provide details about your products, farm/business, and any required licenses or certifications.</li>
<li class="mb-2"><strong>Prepare your products:</strong> Ensure your goods meet local health and safety regulations. This may include proper labeling, packaging, and food handling permits.</li>
<li class="mb-2"><strong>Set up your booth:</strong> Bring tables, tents, signage, and display materials. Make your booth attractive and welcoming to customers.</li>
<li class="mb-2"><strong>Comply with regulations:</strong> Follow all market rules, including hours of operation, accepted payment methods (such as SNAP/EBT), and any local/state requirements.</li>
<li class="mb-2"><strong>Engage with customers:</strong> Be friendly, answer questions, and share information about your products and farm/business.</li>
</ol>
<p>Contact your local market manager for specific requirements and support. Many markets also offer resources or workshops for new vendors.</p>`
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
