<script>
	// import '../../app.css';
	import '$lib/css/css/main.css';
	import { Popover } from '$lib/components/ui/popover/index';
</script>

<div class="container vm-m-auto-l">
	<Popover.Container let:id>
		<Popover.Trigger {id}>d</Popover.Trigger>
		<Popover.Content {id}>c</Popover.Content>
	</Popover.Container>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		color: #fff;
		font-family:
			geist-sans,
			ui-sans-serif,
			system-ui,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			Segoe UI Symbol,
			'Noto Color Emoji';
		font-feature-settings: normal;
		font-variation-settings: normal;
	}
</style>
