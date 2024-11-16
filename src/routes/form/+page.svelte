<script>
	// import MyFormComponent from '$lib/components/ui/form/Form.svelte';
	// import MyInput from '$lib/components/ui/input/input.svelte';
	import { createForm } from '$lib/components/ui/form/index.js';
	import { z } from 'zod';
	// let state = $state();

	const MyForm = createForm({
		username: z.string().email().min(4),
		password: z.string().min(4),
		type: z.string().min(8)
	});

	function handleSubmit() {
		// Validate all fields
		if (form.validate()) {
			console.log('Form is valid!', {
				username: form.username.value,
				password: form.password.value
			});
		} else {
			console.log('Form has errors:', form.errors);
		}
	}

	const form = $state(MyForm());
	$inspect(form.username.value);
</script>

<input bind:value={form.username.value} />
<h1>{form.username.value}</h1>
<input bind:value={form.type.value} />
<h1>{form.type.value}</h1>
<button onclick={handleSubmit}>send</button>
<h1>{form.password.error}</h1>
