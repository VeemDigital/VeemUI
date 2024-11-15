<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, id } = $props();
	let { triggerRect, isOpen } = getContext(`pop-${id}`);

	let contentElement;
	// let open = false;
	let top = 0;
	let left = 0;
	$effect(() => {
		// open = isOpen;
		// console.log(isOpen);
		// if (triggerRect) {
		// top = triggerRect.y;
		// left = triggerRect.x;
		// }
	});
</script>

{#if isOpen}
	<div
		bind:this={contentElement}
		class="popover-content"
		style="top: {top}px; left: {left}px;"
		transition:fade
	>
		{@render children()}
	</div>
{/if}

<style>
	.popover-content {
		position: fixed;
		background-color: #000;
	}
</style>
