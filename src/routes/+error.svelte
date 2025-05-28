<script>
	import Button from '$lib/components/Button.svelte';
	export let error;
	export let status;
</script>

<main class="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 text-center">
	{#if status === 404}
		<h1 class="text-5xl font-medium text-slate-950">404 - Page Not Found</h1>
		<p class="mb-4 text-lg text-slate-600">Sorry, the page you are looking for does not exist.</p>
		<Button variant="primary" size="md" href="/">Go Home</Button>
	{:else}
		<h1 class="text-5xl font-medium text-slate-950">{status ?? 'Error'}</h1>
		<p class="mb-4 text-lg text-slate-600">
			{error && error.message ? error.message : 'An unexpected error occurred.'}
		</p>
		<Button variant="primary" size="md" href="/">Go Home</Button>
	{/if}
</main>
