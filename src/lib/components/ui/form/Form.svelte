<script>
	let { form, onSend } = $props();

	let formData = { ...form.initialState };
	let errors = {};

	const validateField = (key) => {
		const error = form.validateField(key, formData[key]);
		errors = { ...errors, [key]: error };
	};

	const handleSubmit = () => {
		const allErrors = Object.keys(formData).reduce((acc, key) => {
			const error = form.validateField(key, formData[key]);
			if (error) acc[key] = error;
			return acc;
		}, {});

		if (Object.keys(allErrors).length > 0) {
			errors = allErrors;
		} else {
			onSend(formData);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<slot />
	{#each Object.entries(errors) as [key, error]}
		{#if error}
			<div class="error">{key}: {error}</div>
		{/if}
	{/each}
</form>
