<script>
	import { getContext } from 'svelte';

	export let open = false;

	const { isOpen, triggerRect } = getContext('popover');

	function handleClick(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		triggerRect.set(rect);
		isOpen.update((value) => !value);
	}
</script>

<div role="presentation" onkeydown={handleClick} onclick={handleClick}>
	<slot />
</div>
