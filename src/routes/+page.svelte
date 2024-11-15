<script>
	import '../app.css';
	import '$lib/css/css/main.css';
	// import CardContainer from '$lib/components/ui/card/card-container.svelte';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { Popover } from '$lib/components/ui/popover/index';
	import Select from '$lib/components/ui/select/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { VeemUIConfig } from '$lib/config/index.js';
	import { themeConfig } from '$lib/config/themes.js';
	import { onMount } from 'svelte';
	import Card from '$lib/components/ui/card/card-container.svelte';

	let chooseDate = $state(new Date());

	onMount(() => {
		new VeemUIConfig(themeConfig.dark);
	});
</script>

<!-- <div style="padding: 10vw;">
		<BorderAnim1><div style=" ">asdf</div></BorderAnim1>
		<h1>crad</h1>
</div> -->

<div class="container vm-m-auto-l">
	<h1>Hello world</h1>
</div>

<style>
	.container {
		width: 100vw;
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
