<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const isOpen = writable(false);
	const triggerRect = writable(null);

	setContext('popover', {
		isOpen,
		triggerRect,
		close: () => isOpen.set(false)
	});
</script>

<div class="relative inline-block">
	<slot />
</div>
