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
	<!-- <CardContainer borderEnd="#BE5CF6" borderStart="#00FFC5">
		<h1>Hello world</h1>
	</CardContainer> -->
	<Popover.Container let:id>
		<Popover.Trigger {id}>
			<Calendar bind:chooseDate enableDays={[1, 2, 4]} />
		</Popover.Trigger>
		<Popover.Content {id}>
			<Card style="vm-auto vm-flex-col" borderEnd="#333" borderStart="#999">
				<h1>Selection du temps</h1>
				<h5 style="color: #666;">Choisir la selection du temps pour le rendez-vous souhaiter.</h5>
				<Select
					triggerName="Selectionner la durées"
					items={[
						{ label: '30 Minutes', value: '1' },
						{ label: '60 Minutes', value: '2' }
					]}
				/>
				<Select triggerName="Selectionner l'heure désirée" items={[{ label: '1', value: '1' }]} />
				<Popover.Close>
					<Button style="margin-left: auto; margin-top: 3vh;">Confirmer</Button>
				</Popover.Close>
			</Card>
		</Popover.Content>
	</Popover.Container>
	<Card borderEnd="#333" borderStart="#999">
		<h1>dddd</h1>
	</Card>
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
