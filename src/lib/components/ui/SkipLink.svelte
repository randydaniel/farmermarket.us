<script lang="ts">
	interface Props {
		href?: string;
		text?: string;
	}

	let { href = '#main-content', text = 'Skip to main content' }: Props = $props();
</script>

<a {href} class="skip-link" aria-label={text}>
	{text}
</a>

<style>
	.skip-link {
		position: absolute;
		top: -40px;
		left: 6px;
		background: #000;
		color: #fff;
		padding: 8px 16px;
		text-decoration: none;
		font-weight: 600;
		font-size: 14px;
		border-radius: 4px;
		z-index: 1000;
		transition: top 0.3s;
	}

	.skip-link:focus {
		top: 6px;
	}

	.skip-link:focus-visible {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}
</style>
