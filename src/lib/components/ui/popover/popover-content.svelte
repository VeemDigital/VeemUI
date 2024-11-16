<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children, id } = $props();
	const { target, isOpen } = getContext(`pop-${id}`);

	let contentElement;
	let top = '0';
	let left = '0';

	$effect(() => {
		if ($target != null) {
			let rect = $target.getBoundingClientRect();
			console.log($target);
			top = rect.top + rect.height;
			left = rect.left;
			contentElement.style.left = left;
		}
	});
</script>

{#if $isOpen}
	<div bind:this={contentElement} class="popover-content" transition:fade>
		{@render children?.()}
	</div>
{/if}

<style>
	.popover-content {
		position: fixed;
		/* background-color: #000; */
	}
</style>
