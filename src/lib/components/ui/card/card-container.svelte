<script>
	import { onMount } from 'svelte';
	import BorderAnim1 from '../border/border-anim1.svelte';

	let { children, className, style, borderStart, borderEnd } = $props();
	let card;
	let width = $state(),
		height = $state();

	onMount(() => {
		const rect = card.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
	});
</script>

<div class="{className} card" {style} bind:this={card}>
	<BorderAnim1 {width} {height} {borderStart} {borderEnd} />
	{@render children()}
</div>

<style>
	.card {
		position: relative;
		border-radius: 1rem;
		border: solid 1px #333;
		z-index: 1;
	}
</style>
