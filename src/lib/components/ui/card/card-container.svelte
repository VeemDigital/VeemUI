<script>
	import { onMount } from 'svelte';
	import BorderAnim1 from '../border/border-anim1.svelte';

	let { children, class: className, style, borderStart, borderEnd, ...rest } = $props();
	let card;
	let width = $state(),
		height = $state();

	onMount(() => {
		const rect = card.getBoundingClientRect();
		width = rect.width - 2;
		height = rect.height - 2;
		console.log(rect);
	});
</script>

<div class="{className} " bind:this={card} {style} {rest}>
	<BorderAnim1 {width} {height} {borderStart} {borderEnd} />
	<div class="card">
		{@render children?.()}
	</div>
</div>

<style>
	.card {
		position: relative;
		border-radius: 1rem;
		/* border: solid 1px #333; */
		z-index: 1;
		padding: 2vw;
		box-sizing: border-box;
		/* border-radius: inherit; */
	}
</style>
