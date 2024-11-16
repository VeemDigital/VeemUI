<script>
	import { Popover } from '$lib/components/ui/popover/index';
	import Button from '../button/button.svelte';

	let { triggerName, items } = $props();
</script>

<button>select ...:</button>
<!-- <select name="item" id="items"> -->
<!-- <option selected="selected">{triggerName}</option> -->
<Popover.Container>
	{#snippet children({ id })}
		<Popover.Trigger {id}>
			<Button>{triggerName}</Button>
		</Popover.Trigger>
		<Popover.Content {id}>
			{#each items as item}
				<Button class="vm-flex" value={item.value}>{item.label}</Button>
			{/each}
		</Popover.Content>
	{/snippet}
</Popover.Container>

<!-- </select> -->

<style>
	select {
		background: #000;
		border: solid 1px #666;
		border-radius: 5px;
		padding: 1vh 1vw;
		min-width: 150px;
		color: #fff;
		margin: 1vh 0 1vh 0;
		width: 100%;
	}
</style>
