<script lang="ts">
	// Ad component props - simplified for full-image ads
	export let ad: {
		id: string;
		image: string;
		url: string;
	};
</script>

<div class="col-span-full">
	<a
		href={ad.url}
		target="_blank"
		rel="noopener noreferrer"
		class="block w-full overflow-hidden rounded-lg transition-all duration-300"
	>
		<img
			src={ad.image}
			alt="Advertisement"
			class="h-auto w-full object-cover"
			loading="lazy"
			on:error={(e) => {
				// Fallback to a placeholder if image fails to load
				const target = e.target as HTMLImageElement;
				if (target && target.parentElement) {
					target.style.display = 'none';
					target.parentElement.innerHTML = `
						<div class="flex h-32 w-full items-center justify-center bg-slate-100 text-slate-400">
							<p class="text-sm">Ad image unavailable</p>
						</div>
					`;
				}
			}}
		/>
	</a>
</div>
