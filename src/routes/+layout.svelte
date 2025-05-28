<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Navigation />
	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
