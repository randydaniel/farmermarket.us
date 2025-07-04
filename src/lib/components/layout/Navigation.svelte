<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { EnvelopeSimple, Barn, List, X } from 'phosphor-svelte';
	import { page } from '$app/stores';
	import { config } from '$lib/config';
	import { slide } from 'svelte/transition';
	import type { BlogPost } from '$lib/utils/markdown';

	interface Props {
		latestBlogPost?: BlogPost | null;
	}

	let { latestBlogPost }: Props = $props();

	// Mobile menu state - using Svelte 5's $state() rune for proper reactivity
	let mobileMenuOpen = $state(false);
	let justToggled = $state(false);

	// Simple toggle function
	function toggleMobileMenu(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		mobileMenuOpen = !mobileMenuOpen;
		
		// Prevent click outside from immediately closing
		justToggled = true;
		setTimeout(() => {
			justToggled = false;
		}, 100);
	}

	// Close mobile menu when clicking nav links
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	// Close mobile menu when clicking outside
	function handleClickOutside(event: Event) {
		// Don't close if we just toggled
		if (justToggled) return;
		
		const target = event.target as Element;
		
		// Don't close if clicking on the button or menu
		if (target.closest('[data-mobile-menu-button]') || target.closest('[data-mobile-menu]')) {
			return;
		}
		
		// Close if menu is open and clicking outside
		if (mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	}
</script>

<!-- Click outside handler -->
<svelte:window on:click={handleClickOutside} />

<nav class="sticky top-0 z-40 w-full bg-white py-4 shadow-xs dark:bg-slate-950">
	<div class="relative container mx-auto flex items-center justify-between px-4 xl:px-0">
		<!-- Left: Logo + Nav Links (Original Structure) -->
		<div class="flex items-center gap-4 sm:gap-8">
			<a
				href="/"
				class="flex items-center gap-1 text-lg font-medium text-slate-950 transition-colors duration-300 hover:text-slate-700 sm:gap-2 dark:text-slate-50 hover:dark:text-slate-100"
				on:click={closeMobileMenu}
			>
				<Barn size={24} />
				<span class="block text-base sm:text-lg">{config.siteName}</span>
			</a>

			<!-- Desktop Nav Links (Hidden on Mobile) -->
			<ul class="hidden gap-8 md:flex">
				<li>
					<a
						href="/"
						class={`text-base font-normal transition-all duration-300
						${$page.url.pathname === '/' ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						Directory
					</a>
				</li>
				<li>
					<a
						href="/blog"
						class={`text-base font-normal transition-all duration-300
						${$page.url.pathname.startsWith('/blog') ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						Blog
					</a>
				</li>
				<li>
					<a
						href="/faq"
						class={`text-base font-normal transition-all duration-300
						${$page.url.pathname === '/faq' ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						FAQ
					</a>
				</li>
			</ul>
		</div>

		<!-- Center: Latest Blog Post with NEW Badge (Desktop Only) - Absolutely Centered -->
		{#if latestBlogPost}
			<div
				class="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:block pointer-events-none"
			>
				<a
					href="/blog/{latestBlogPost.slug}"
					class="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 py-2 pr-4 pl-2 whitespace-nowrap transition-all duration-300 hover:from-blue-100 hover:to-indigo-100 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 pointer-events-auto"
				>
					<span
						class="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white"
					>
						NEW
					</span>
					<span
						class="max-w-[200px] truncate text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100"
					>
						{latestBlogPost.title}
					</span>
				</a>
			</div>
		{/if}

		<!-- Right: Contact Button + Mobile Menu Button -->
		<div class="flex items-center gap-4">
			<!-- Desktop Contact Button -->
			<div class="hidden md:block">
				<Button
					variant="primary"
					size="md"
					href="mailto:{config.contactEmail}?subject=Resource Directory Inquiry"
					leftIcon={{ component: EnvelopeSimple, props: { size: 16 } }}
				>
					Contact
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				type="button"
				class="mobile-menu-button flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:hidden"
				data-mobile-menu-button
				on:click={toggleMobileMenu}
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
			>
				{#if mobileMenuOpen}
					<X size={24} />
				{:else}
					<List size={24} />
				{/if}
			</button>
			
			<!-- Debug indicator - removing since it's working now -->
			<!-- <div class="fixed top-20 right-4 z-50 bg-red-500 text-white px-2 py-1 text-xs rounded md:hidden">
				Debug: {mobileMenuOpen ? 'OPEN' : 'CLOSED'}
			</div> -->
		</div>
	</div>

<!-- Mobile Menu (Collapsible) -->
{#if mobileMenuOpen}
	<div class="absolute left-0 right-0 top-full bg-white border-t border-slate-200 shadow-lg z-50 md:hidden" data-mobile-menu>
		<div class="container mx-auto px-4 xl:px-0">
			<div class="space-y-1 py-4">
				<!-- Mobile Menu Items -->
				<a
					href="/"
					class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200
					${$page.url.pathname === '/' ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
					on:click={closeMobileMenu}
				>
					Directory
				</a>
				<a
					href="/blog"
					class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200
					${$page.url.pathname.startsWith('/blog') ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
					on:click={closeMobileMenu}
				>
					Blog
				</a>
				<a
					href="/faq"
					class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200
					${$page.url.pathname === '/faq' ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
					on:click={closeMobileMenu}
				>
					FAQ
				</a>
			</div>
		</div>
	</div>
{/if}
</nav>

<style>
	/* Add smooth transition for mobile menu button */
	.mobile-menu-button {
		transition: all 0.2s ease-in-out;
	}

	/* Ensure mobile menu transitions smoothly */
	.mobile-menu {
		transition: all 0.2s ease-in-out;
	}
</style>
