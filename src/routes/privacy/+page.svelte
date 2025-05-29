<script lang="ts">
	import { config } from '$lib/config';
</script>

<svelte:head>
	<title>Privacy Policy | {config.siteName}</title>
	<meta
		name="description"
		content="Privacy Policy for {config.siteName}. Learn how we collect, use, and protect your information when you visit our site."
	/>
	<meta name="keywords" content="privacy policy, privacy, data protection, {config.siteName}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Privacy Policy | {config.siteName}" />
	<meta
		property="og:description"
		content="Privacy Policy for {config.siteName}. Learn how we collect, use, and protect your information when you visit our site."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="Privacy Policy | {config.siteName}" />
	<meta
		property="twitter:description"
		content="Privacy Policy for {config.siteName}. Learn how we collect, use, and protect your information when you visit our site."
	/>
</svelte:head>

<main class="container mx-auto max-w-[900px] px-4 py-24">
	<!-- Header -->
	<h1 class="mb-4 text-4xl font-normal text-slate-950">Privacy Policy</h1>

	<!-- Privacy Content -->
	<div class="prose prose-slate max-w-none">
		<p class="mb-8 text-base leading-relaxed text-slate-600">
			{config.siteName} ("we," "our," or "us") respects your privacy. This Privacy Policy explains how
			we collect, use, and protect your information when you visit {config.defaultSiteUrl.replace(
				'https://',
				''
			)} (the "Site").
		</p>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">1. Information We Collect</h2>
			<p class="mb-4 text-base leading-relaxed text-slate-600">
				We may collect the following types of information:
			</p>
			<ul class="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
				<li>
					<strong>Personal Information:</strong> When you fill out forms (e.g., contact, listings), we
					may collect your name, email address, phone number, etc.
				</li>
				<li>
					<strong>Usage Data:</strong> We automatically collect information about your device and usage,
					such as browser type, IP address, and pages visited.
				</li>
				<li>
					<strong>Cookies:</strong> We may use cookies to enhance your experience on the Site.
				</li>
			</ul>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">2. How We Use Your Information</h2>
			<p class="mb-4 text-base leading-relaxed text-slate-600">We may use your information to:</p>
			<ul class="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
				<li>Provide and maintain the Site</li>
				<li>Communicate with you (e.g., responses to inquiries)</li>
				<li>Improve our services and user experience</li>
				<li>Send updates or marketing materials (you can opt out at any time)</li>
			</ul>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">3. Sharing of Information</h2>
			<p class="mb-4 text-base leading-relaxed text-slate-600">
				We do not sell your personal information. We may share it only:
			</p>
			<ul class="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
				<li>With service providers who assist us in operating the Site</li>
				<li>To comply with legal obligations or protect our rights</li>
				<li>With your consent</li>
			</ul>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">4. Data Security</h2>
			<p class="text-base leading-relaxed text-slate-600">
				We use reasonable administrative and technical safeguards to protect your information.
				However, no method of transmission over the Internet is 100% secure.
			</p>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">5. Your Rights</h2>
			<p class="mb-4 text-base leading-relaxed text-slate-600">
				Depending on your location, you may have the right to:
			</p>
			<ul class="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
				<li>Access or correct your personal data</li>
				<li>Request deletion of your data</li>
				<li>Withdraw consent for data processing</li>
			</ul>
			<p class="text-base leading-relaxed text-slate-600">
				Contact us at <a href="mailto:{config.contactEmail}" class="text-slate-950 hover:underline"
					>{config.contactEmail}</a
				> to make a request.
			</p>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">6. Third-Party Links</h2>
			<p class="text-base leading-relaxed text-slate-600">
				The Site may contain links to third-party websites. We are not responsible for the privacy
				practices of those sites.
			</p>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">7. Children's Privacy</h2>
			<p class="text-base leading-relaxed text-slate-600">
				The Site is not intended for children under 13. We do not knowingly collect personal data
				from children.
			</p>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">8. Changes to This Policy</h2>
			<p class="text-base leading-relaxed text-slate-600">
				We may update this Privacy Policy from time to time. Changes will be posted on this page
				with an updated effective date.
			</p>
		</section>

		<hr class="my-8 border-slate-200" />

		<section class="mb-8">
			<h2 class="mb-4 text-2xl font-normal text-slate-950">9. Contact Us</h2>
			<p class="text-base leading-relaxed text-slate-600">
				If you have any questions about these Terms, please contact us at <a
					href="mailto:{config.contactEmail}"
					class="text-slate-950 hover:underline">{config.contactEmail}</a
				>.
			</p>
		</section>
	</div>
</main>
