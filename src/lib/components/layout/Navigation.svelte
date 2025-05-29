<script>
	import Button from '$lib/components/ui/Button.svelte';
	import { EnvelopeSimple, NyTimesLogo } from 'phosphor-svelte';
	import { page } from '$app/stores';
</script>

<nav class="w-full bg-white py-4">
	<div class="container mx-auto flex items-center justify-between">
		<!-- Left: Logo/Title + Nav Links -->
		<div class="flex items-center gap-8">
			<div class="flex items-center gap-2 text-lg font-medium text-slate-950">
				<NyTimesLogo size={24} />
				Resources Directory
			</div>
			<ul class="flex gap-8">
				<li>
					<a
						href="/"
						class={`text-base font-normal transition-all duration-300
						${$page.url.pathname === '/' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
					>
						Directory
					</a>
				</li>
				<li>
					<a
						href="/faq"
						class={`text-base font-normal transition-all duration-300
						${$page.url.pathname === '/faq' ? 'underline-dotted text-slate-950 underline' : 'text-slate-600 hover:text-slate-950'}`}
					>
						FAQ
					</a>
				</li>
			</ul>
		</div>
		<!-- Right: Contact Button -->
		<Button
			variant="primary"
			size="md"
			href="/"
			leftIcon={{ component: EnvelopeSimple, props: { size: 16 } }}>Contact</Button
		>
	</div>
</nav>
