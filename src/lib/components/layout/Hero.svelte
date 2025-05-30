<script lang="ts">
	export let align: 'left' | 'center' | 'right' = 'center';
	export let background: string = '';
	export let backgroundMobile: string = '';
</script>

<section class="bg-background-color relative flex h-96 items-center overflow-hidden px-4">
	<!-- Content Container with contained background image -->
	<div class="relative z-10 container mx-auto flex h-full flex-col justify-center px-4 xl:px-0">
		<!-- Mobile Background image -->
		{#if backgroundMobile}
			<div
				class="absolute inset-0 z-0 bg-cover bg-center sm:hidden"
				style={`background-image: url('${backgroundMobile}');`}
			></div>
		{/if}
		<!-- Desktop Background image -->
		{#if background}
			<div
				class="absolute inset-0 z-0 hidden bg-cover bg-center sm:block"
				style={`background-image: url('${background}');`}
			></div>
		{/if}

		<!-- Content -->
		<div
			class={`relative z-20 max-w-2xl
			${align === 'center' ? 'mx-auto text-center' : ''}
			${align === 'left' ? 'mr-auto ml-0 text-left' : ''}
			${align === 'right' ? 'mr-0 ml-auto text-right' : ''}`}
		>
			<slot />
		</div>
	</div>
</section>
