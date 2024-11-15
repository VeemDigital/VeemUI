<script>
	import { getContext } from 'svelte';
	let { id = $bindable() } = $props();
	$inspect(id);

	const { isOpen } = getContext(`pop-${id}`);

	function handleClick(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		triggerRect.set(rect);
		isOpen.update((value) => !value);
	}
</script>

<div role="presentation" onkeydown={handleClick} onclick={handleClick}>
	<slot />
</div>
