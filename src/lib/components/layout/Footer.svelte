<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { EnvelopeSimple, NyTimesLogo } from 'phosphor-svelte';
	import { page } from '$app/stores';
	import { config } from '$lib/config';
</script>

<footer class="border-t border-slate-200 py-11">
	<div class="container mx-auto">
		<div class="flex justify-between">
			<!-- Left Side -->
			<div class="flex flex-col gap-4">
				<div class="flex max-w-sm flex-col gap-8">
					<a
						href="/"
						class="flex items-center gap-1 text-lg leading-none font-medium text-slate-950 transition-colors duration-300 hover:text-slate-700"
					>
						<NyTimesLogo size={24} />
						{config.siteName}
					</a>
					<p class="text-sm leading-normal font-light text-slate-600">
						All the tools &amp; resources you need, in one place. Boost productivity, unleash
						creativity, and simplify tasks with our curated collection.
					</p>
				</div>
				<div class="flex max-w-sm flex-col gap-2">
					<p class="text-sm leading-normal font-light text-slate-600">
						Looking to promote your resource or sponsor your service? Contact us.
					</p>
					<Button
						variant="primary"
						size="md"
						href="mailto:{config.contactEmail}"
						leftIcon={{ component: EnvelopeSimple, props: { size: 16 } }}>Contact</Button
					>
				</div>
			</div>
			<!-- Right Side -->
			<div class="flex flex-row gap-24">
				<div class="flex flex-col gap-2">
					<h3 class="text-lg leading-none font-medium text-slate-950">Links</h3>
					<ul class="flex flex-col gap-1">
						<li>
							<a
								href="/"
								class={`text-sm leading-normal font-light transition-all duration-300
								${$page.url.pathname === '/' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
							>
								Directory
							</a>
						</li>
						<li>
							<a
								href="/faq"
								class={`text-sm leading-normal font-light transition-all duration-300
								${$page.url.pathname === '/faq' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
							>
								FAQ
							</a>
						</li>
					</ul>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="text-lg leading-none font-medium text-slate-950">Sites</h3>
					<ul class="flex flex-col gap-1">
						<li>
							<a
								href="/terms"
								class={`text-sm leading-normal font-light transition-all duration-300
								${$page.url.pathname === '/terms' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
							>
								Terms of Use
							</a>
						</li>
						<li>
							<a
								href="/privacy"
								class={`text-sm leading-normal font-light transition-all duration-300
								${$page.url.pathname === '/privacy' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
							>
								Privacy Policy
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
