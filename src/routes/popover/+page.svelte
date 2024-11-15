<script>
	import '../../app.css';
	import '$lib/css/css/main.css';
	import '$lib/css/index.js';
	import { Popover } from '$lib/components/ui/popover/index';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import CardContainer from '$lib/components/ui/card/card-container.svelte';
	import Select from '$lib/components/ui/select/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let chooseDate = $state(new Date());
</script>

<div class="container vm-m-auto-l">
	<Popover.Container>
		{#snippet children({ id })}
			<Popover.Trigger {id}
				><Calendar class="vm-glass-bg" bind:chooseDate enableDays={[1, 2, 4]} /></Popover.Trigger
			>
			<Popover.Content {id}>
				<CardContainer borderStart="#fff" borderEnd="#000" class="vm-glass-bg">
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
					<Popover.Close {id}>
						<Button style="margin-left: auto; margin-top: 3vh;">Confirmer</Button>
					</Popover.Close>
				</CardContainer>
			</Popover.Content>
		{/snippet}
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
