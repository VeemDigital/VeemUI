<script>
	let { message } = $props();
</script>

<div class="toast">
	<svg
		class="logo"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		height="20"
		width="20"
		><path
			fill-rule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
			clip-rule="evenodd"
		></path></svg
	>
	<div class="info-section">
		<p>Event has been created</p>
		<p class="color-second">Sunday, Decenber 03, 2024 at 9:00 am</p>
	</div>
	<button class="under-btn">Undo</button>
</div>

<style>
	.toast {
		position: absolute;
		/* right: 5%; */
		background-color: transparent;
		/* margin-top: 10px; */
		/* margin-bottom: 10px; */
		background-color: #000;
		border-radius: 10px;
		border: solid 1px #333;
		color: #fff;
		display: flex;

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
		border: solid 1px #333;
		font-size: 14px;

		padding: 2vh 2vw 2vh 2vw;
		align-items: center;

		z-index: 999;
	}

	.toast * {
		margin-left: 0.5vw;
		margin-right: 0.5vw;
	}

	/* .toast:first-child {
		-webkit-animation: move 1s ease-out;
		animation: move 1s ease-out;
	} */

	/* @-webkit-keyframes move { */
	/* 0% {
			margin-top: 42px;
		}
		100% {
			margin-top: 2px;
		}
	}

	@keyframes move {
		0% {
			margin-top: 42px;
		}
		100% {
			margin-top: 2px;
		}
	} */

	p {
		padding: 0;
		margin: 0;
	}

	.color-second {
		color: #555;
	}

	button {
		border: none;
		border-radius: 4px;
		padding: 0.6vh 0.8vw 0.6vh 0.8vw;
	}
</style>
