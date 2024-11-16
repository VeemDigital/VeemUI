<script>
	import { getContext, onMount } from 'svelte';
	let { children, id = $bindable() } = $props();
	$inspect(id);
	let elem;
	let targetElem;

	const { isOpen, target } = getContext(`pop-${id}`);

	function handleClick(e) {
		target.set(e.currentTarget);
		isOpen.update((value) => !value);
	}
</script>

<div bind:this={elem} role="presentation" onclick={handleClick}>
	{@render children?.()}
</div>
