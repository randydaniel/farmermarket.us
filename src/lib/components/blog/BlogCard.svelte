<script lang="ts">
	import { Calendar, Clock, User, ArrowUpRight } from 'phosphor-svelte';
	import type { BlogPost } from '$lib/utils/markdown';
	import { formatDate } from '$lib/utils/markdown';
	import Button from '$lib/components/ui/Button.svelte';

	export let post: BlogPost;
</script>

<article
	class="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
>
	<!-- Image -->
	{#if post.image}
		<div class="aspect-[16/9] overflow-hidden">
			<img
				src={post.image}
				alt={post.title}
				class="h-full w-full object-cover transition-transform group-hover:scale-105"
				loading="lazy"
			/>
		</div>
	{/if}

	<!-- Content -->
	<div class="flex flex-1 flex-col p-6">
		<!-- Meta info -->
		<div class="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
			<div class="flex items-center gap-1">
				<Calendar size={16} />
				<time datetime={post.date}>{formatDate(post.date)}</time>
			</div>

			{#if post.readingTime}
				<div class="flex items-center gap-1">
					<Clock size={16} />
					<span>{post.readingTime} min read</span>
				</div>
			{/if}

			{#if post.author}
				<div class="flex items-center gap-1">
					<User size={16} />
					<span>{post.author}</span>
				</div>
			{/if}
		</div>

		<!-- Title -->
		<h2 class="mb-3 text-xl font-semibold text-slate-950 dark:text-slate-50">
			<a href="/blog/{post.slug}" class="after:absolute after:inset-0 hover:text-red-600">
				{post.title}
			</a>
		</h2>

		<!-- Excerpt -->
		<p class="mb-4 flex-1 text-base leading-relaxed text-slate-600 dark:text-slate-300">
			{post.excerpt || post.description}
		</p>

		<!-- Tags -->
		{#if post.tags && post.tags.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.tags.slice(0, 3) as tag}
					<span
						class="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
					>
						{tag}
					</span>
				{/each}
				{#if post.tags.length > 3}
					<span class="text-sm text-slate-500 dark:text-slate-400">
						+{post.tags.length - 3} more
					</span>
				{/if}
			</div>
		{/if}

		<!-- Read more button -->
		<div class="relative z-10">
			<Button
				variant="secondary"
				size="sm"
				href="/blog/{post.slug}"
				rightIcon={{ component: ArrowUpRight, props: { size: 16 } }}
			>
				Read Article
			</Button>
		</div>
	</div>
</article>
