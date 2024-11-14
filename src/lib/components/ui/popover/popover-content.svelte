<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const { isOpen, triggerRect } = getContext('popover');

	let contentElement;
	let top = 0;
	let left = 0;

	$: if ($triggerRect && contentElement) {
		console.log($triggerRect);
		top = $triggerRect.y;
		left = $triggerRect.x;
	}
</script>

{#if $isOpen}
	<div
		bind:this={contentElement}
		class="popover-content"
		style="top: {top}px; left: {left}px;"
		transition:fade
	>
		<slot />
	</div>
{/if}

<style>
	.popover-content {
		position: absolute;
		background-color: #000;
		padding: 3vw;
		border-radius: 16px;
		border: solid 1px #777;
	}
</style>
