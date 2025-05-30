<script lang="ts">
	export let align: 'left' | 'center' | 'right' = 'center';
	export let background: string = '';
</script>

<section class="relative flex min-h-96 items-center overflow-hidden px-4 py-16">
	<!-- Overlay: slate-200 with opacity -->
	<div class="pointer-events-none absolute inset-0 z-0 bg-slate-200/80"></div>
	<!-- Background image -->
	{#if background}
		<div
			class="absolute inset-0 z-0 bg-cover bg-center"
			style={`background-image: url('${background}');`}
		></div>
	{/if}
	<!-- Content -->
	<div
		class={`relative z-10 container mx-auto px-4 xl:px-0 ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}
	>
		<slot />
	</div>
</section>
