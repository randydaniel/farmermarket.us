<script lang="ts">
	import { config } from '$lib/config';
</script>

<svelte:head>
	<title>Terms of Use | {config.siteName}</title>
	<meta
		name="description"
		content="Terms of Use for {config.siteName}. Please read our terms and conditions carefully before using our service."
	/>
	<meta name="keywords" content="terms of use, terms and conditions, legal, {config.siteName}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Terms of Use | {config.siteName}" />
	<meta
		property="og:description"
		content="Terms of Use for {config.siteName}. Please read our terms and conditions carefully before using our service."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="Terms of Use | {config.siteName}" />
	<meta
		property="twitter:description"
		content="Terms of Use for {config.siteName}. Please read our terms and conditions carefully before using our service."
	/>
</svelte:head>

<main
	class="container mx-auto max-w-[900px] px-4 py-12 xl:px-0 xl:py-24 dark:bg-slate-950 dark:text-slate-50"
>
	<!-- Header -->
	<h1 class="mb-4 text-4xl font-normal text-slate-950 dark:text-slate-50">Terms of Use</h1>

	<!-- Terms Content -->
	<div class="prose prose-slate max-w-none dark:text-slate-200">
		<p class="mb-8 text-base leading-relaxed text-slate-600 dark:text-slate-200">
			Welcome to {config.siteName} ("we", "our", or "us"). By accessing or using our website located
			at {config.defaultSiteUrl.replace('https://', '')} (the "Site"), you agree to comply with and be
			bound by the following terms and conditions ("Terms of Use"). Please read them carefully.
		</p>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				1. Acceptance of Terms
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				By accessing or using the Site, you agree to these Terms of Use and our Privacy Policy. If
				you do not agree, do not use the Site.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				2. Use of the Site
			</h2>
			<p class="mb-4 text-base leading-relaxed text-slate-600 dark:text-slate-200">
				You may use the Site only for lawful purposes and in accordance with these Terms. You agree
				not to:
			</p>
			<ul
				class="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600 dark:text-slate-200"
			>
				<li>Use the Site in any way that violates any applicable law or regulation.</li>
				<li>Use the Site to transmit any spam, malware, or other harmful content.</li>
				<li>Attempt to gain unauthorized access to the Site or any related systems.</li>
			</ul>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				3. Directory Listings
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				We provide a platform for businesses, services, and other entities to be listed and
				discovered. We do not endorse or guarantee the accuracy of any listing. Users are
				responsible for verifying the information before engaging with any listed entity.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				4. Intellectual Property
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				All content on the Site, including text, graphics, logos, and software, is the property of {config.siteName}
				or its licensors and is protected by copyright and other intellectual property laws.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				5. User Submissions
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				By submitting content (e.g., listings, reviews), you grant us a non-exclusive, royalty-free
				license to use, display, and distribute such content on the Site. You represent that you
				have the right to submit this content.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">6. Disclaimers</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				The Site and all content are provided "as is" without warranties of any kind. We do not
				guarantee the accuracy, completeness, or usefulness of any content.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				7. Limitation of Liability
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				To the maximum extent permitted by law, we are not liable for any indirect, incidental, or
				consequential damages arising out of your use of the Site.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">
				8. Changes to Terms
			</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				We may update these Terms at any time. Continued use of the Site after changes are posted
				constitutes acceptance of the new Terms.
			</p>
		</section>

		<hr class="my-8 border-slate-200 dark:border-slate-800" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950 dark:text-slate-50">9. Contact Us</h2>
			<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
				If you have any questions about these Terms, please contact us at <a
					href="mailto:{config.contactEmail}"
					class="text-slate-950 hover:underline">{config.contactEmail}</a
				>.
			</p>
		</section>
	</div>
</main>
