<script>
	import SelectContent from './select-content.svelte';

	let { triggerName, items } = $props();
</script>

<div class="select">
	<SelectContent {triggerName} {items} />
</div>

<style>
	.select {
		display: flex;
	}
</style>
