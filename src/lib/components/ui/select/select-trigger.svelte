<script>
	let { triggerName } = $props();
</script>

<label for="items">{triggerName}</label>

<style>
	label {
		font-size: 1vw;
		background: #000;
		border: solid 1px #666;
		border-radius: 5px;
		padding: 1vw;
	}
</style>
