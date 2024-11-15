<script>
	let { children, borderStart, borderEnd, width = $bindable(), height = $bindable() } = $props();
</script>

<div
	style:--border-anim-color-1={borderStart}
	style:--border-anim-color-2={borderEnd}
	style="width: {width}px; height: {height}px"
	class="animate-border-1"
></div>

<style>
	.animate-border-1 {
		position: absolute;
		mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
		-webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
		mask-clip: padding-box, border-box !important;
		-webkit-mask-clip: padding-box, border-box !important;
		mask-composite: intersect !important;
		border: 1px solid #333;
		box-sizing: border-box;
		border-radius: inherit;
		z-index: -1;
	}

	.animate-border-1::after {
		content: '';
		position: absolute;
		width: 150px;
		height: 150px;
		background: linear-gradient(
			to left,
			var(--border-anim-color-1),
			var(--border-anim-color-2),
			transparent
		);
		offset-path: rect(0 auto auto 0 round calc(100 * 1px));
		offset-distance: 0%;
		animation: border-beam 10s infinite linear;
		aspect-ratio: 1 / 1;
		box-sizing: border-box;
		border-radius: inherit;
		border: solid 1px #333;
	}

	@keyframes border-beam {
		to {
			offset-distance: 100%;
			/* transform: rotate(360deg); */
		}
	}
</style>
