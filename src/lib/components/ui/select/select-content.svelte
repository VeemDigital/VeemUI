<script>
	let { triggerName, items } = $props();
</script>

<select name="item" id="items">
	<option selected="selected">{triggerName}</option>

	{#each items as item}
		<option value={item.value}>{item.label}</option>
	{/each}
</select>

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
