<script lang="ts">
	export let activeTab: string;
	export let tabs: { id: string; label: string }[];
	export let onTabChange: (tabId: string) => void;
</script>

<div class="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
	{#each tabs as tab}
		<button
			class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:outline-none dark:focus:ring-slate-50 {activeTab ===
			tab.id
				? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-50'
				: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50'}"
			on:click={() => onTabChange(tab.id)}
		>
			{tab.label}
		</button>
	{/each}
</div>
