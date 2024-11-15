<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, id } = $props();
	let { triggerRect, isOpen } = getContext(`pop-${id}`);
	$inspect($isOpen);

	let contentElement;
	let top = '0';
	let left = '0';
	$effect(() => {
		if ($triggerRect != null) {
			top = $triggerRect.y;
			left = $triggerRect.x;
		}
	});
</script>

{#if $isOpen}
	<div
		bind:this={contentElement}
		class="popover-content"
		style="top: {top}px; left: {left}px;"
		transition:fade
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.popover-content {
		position: fixed;
		background-color: #000;
	}
</style>
