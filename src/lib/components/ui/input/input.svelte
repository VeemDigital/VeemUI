<script>
	let { id, value, onInputChange } = $props();

	function handleInput(event) {
		const newValue = event.target.value;
		onInputChange(id, newValue);
	}
</script>

<div>
	<input type="text" {id} {value} oninput={handleInput} />
</div>
