<script>
	let { className, style, children } = $props();
</script>

<button class={className} {style}>{@render children()}</button>

<style>
	button {
		padding: 1vh 1vw;
	}
</style>
