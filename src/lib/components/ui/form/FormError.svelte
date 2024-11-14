<script>
	let { error } = $props();
</script>

{#if error != ''}
	<div class="form-error">{error}</div>
{/if}

<style>
	.form-error {
		padding: 1vw;
		font-size: 15px;
		color: red;
	}
</style>
