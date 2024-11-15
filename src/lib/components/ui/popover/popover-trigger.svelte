<script>
	import { getContext } from 'svelte';
	let { children, id = $bindable() } = $props();
	$inspect(id);

	const { isOpen, triggerRect } = getContext(`pop-${id}`);

	function handleClick(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		triggerRect.set(rect);
		isOpen.update((value) => !value);
	}
</script>

<div role="presentation" onkeydown={handleClick} onclick={handleClick}>
	{@render children?.()}
</div>
