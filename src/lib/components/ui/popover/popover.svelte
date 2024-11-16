<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	let { children } = $props();
	let id = $state(crypto.randomUUID().toString().slice(0, 10));
	const isOpen = writable(false);
	const target = writable(null);
	setContext(`pop-${id}`, { isOpen, target });
	onMount(() => {});
</script>

<div class="relative inline-block">
	{@render children({ id })}
</div>
