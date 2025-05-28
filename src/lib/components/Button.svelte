<script lang="ts">
	export let variant: 'primary' | 'secondary' = 'primary';
	export let leftIcon: any = null;
	export let rightIcon: any = null;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let href: string | null = null;
</script>

{#if href}
	<a
		{href}
		class={`inline-flex w-fit items-center gap-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none
    ${size === 'sm' ? 'px-3 py-1 text-xs' : ''}
    ${size === 'md' ? 'px-4 py-2 text-sm' : ''}
    ${size === 'lg' ? 'px-6 py-3 text-base' : ''}
    ${variant === 'primary' ? 'bg-slate-950/90 text-slate-50 hover:bg-slate-950' : ''}
    ${variant === 'secondary' ? 'bg-slate-50/90 text-slate-950 hover:bg-slate-50' : ''}
    disabled:pointer-events-none disabled:opacity-50`}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
	>
		{#if leftIcon}
			<span class="flex items-center">
				<svelte:component this={leftIcon.component} {...leftIcon.props} />
			</span>
		{/if}
		<slot />
		{#if rightIcon}
			<span class="flex items-center">
				<svelte:component this={rightIcon.component} {...rightIcon.props} />
			</span>
		{/if}
	</a>
{:else}
	<button
		{type}
		class={`inline-flex w-fit items-center gap-2 rounded-full font-medium transition-all duration-300 hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none
    ${size === 'sm' ? 'px-3 py-1 text-xs' : ''}
    ${size === 'md' ? 'px-4 py-2 text-sm' : ''}
    ${size === 'lg' ? 'px-6 py-3 text-base' : ''}
    ${variant === 'primary' ? 'bg-slate-950/90 text-slate-50 hover:bg-slate-950' : ''}
    ${variant === 'secondary' ? 'bg-slate-50/90 text-slate-950 hover:bg-slate-50' : ''}
    disabled:pointer-events-none disabled:opacity-50`}
		{disabled}
	>
		{#if leftIcon}
			<span class="flex items-center">
				<svelte:component this={leftIcon.component} {...leftIcon.props} />
			</span>
		{/if}
		<slot />
		{#if rightIcon}
			<span class="flex items-center">
				<svelte:component this={rightIcon.component} {...rightIcon.props} />
			</span>
		{/if}
	</button>
{/if}
