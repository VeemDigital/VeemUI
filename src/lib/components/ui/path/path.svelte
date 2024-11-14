<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
	export let width = 600;
	export let height = 300;

	// Define paths data with their start and end points
	const pathDefinitions = [
		{ path: 'M120 80 Q210 80, 275 170', id: 0 },
		{ path: 'M120 140 Q210 140, 275 170', id: 1 },
		{ path: 'M120 200 Q210 200, 275 170', id: 2 },
		{ path: 'M120 260 Q210 260, 275 170', id: 3 },
		{ path: 'M325 170 L480 170', id: 4 }
	];

	const gradients = [
		{ purple: '#8B5CF6', orange: '#BE5CF6' },
		{ purple: '#9333EA', orange: '#BE5CF6' },
		{ purple: '#7C3AED', orange: '#BE5CF6' },
		{ purple: '#6D28D9', orange: '#BE5CF6' },
		{ purple: '#A855F7', orange: '#BE5CF6' }
	];

	let activePaths = [];
	let isEnable = false;

	function createRandomPath(path) {
		const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
		const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

		return {
			...path,
			gradientId,
			gradient: randomGradient
		};
	}

	onMount(() => {
		gsap.registerPlugin(DrawSVGPlugin);
		let i = 0;
		pathDefinitions.forEach((curr) => {
			console.log(i);
			activePaths = [...activePaths, createRandomPath(curr)];
			i++;
		});
	});

	function set() {
		gsap.set('#path', { duration: 5, ease: 'power4.inOut', drawSVG: '10% 0%' });
	}

	function add() {
		gsap.set('#path', { duration: 5, ease: 'power4.inOut', drawSVG: '0%' });
		gsap.set('#path-end', { duration: 5, ease: 'power4.inOut', drawSVG: '0%' });
		let tl = gsap.timeline({ repeat: -1 });
		tl.to('#path', {
			duration: 1,
			ease: 'power4.in',
			drawSVG: '0% 20%'
		})
			.to('#path', { duration: 1, ease: 'none', drawSVG: '80% 100%' })
			.to('#path', { duration: 0.3, ease: 'power4.Out', drawSVG: '100% 100%' })
			.to('#path-end', { duration: 0.1, ease: 'power4.In', drawSVG: '20%' })
			.to('#path-end', { duration: 2, ease: 'power4.InOut', drawSVG: '100% 100%' });
		// .to('#path-end', { duration: 0.4, ease: 'power4.Out', drawSVG: '100% 100%' });
	}
</script>

<div class="container">
	<svg {width} {height} viewBox="0 0 600 300">
		<defs>
			{#each activePaths as { gradientId, gradient }}
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:{gradient.purple};stop-opacity:1" />
					<stop offset="100%" style="stop-color:{gradient.orange};stop-opacity:1" />
				</linearGradient>
			{/each}

			<linearGradient id="ll" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style="stop-color:#fff;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#fff;stop-opacity:1" />
			</linearGradient>
		</defs>

		<!-- Background paths -->
		{#each pathDefinitions as { path }}
			<path class="path" d={path} />
		{/each}

		<!-- Animated paths -->
		{#each activePaths as { path, gradientId }}
			<path id="path" class="path-animation path" style="stroke: url(#{gradientId});" d={path} />
		{/each}

		<path id="path-end" class="path-animation path" d="M325 170 L480 170" />
		<!-- Nodes rendered last to appear on top -->
		<!-- Left nodes -->
		<circle class="node" cx="100" cy="80" r="20" />
		<circle class="node" cx="100" cy="140" r="20" />
		<circle class="node" cx="100" cy="200" r="20" />
		<circle class="node" cx="100" cy="260" r="20" />

		<!-- Center node -->
		<circle class="center-node" cx="300" cy="170" r="25" />
		<text class="node-text" x="300" y="170">A</text>

		<!-- Right node -->
		<circle class="node" cx="500" cy="170" r="20" />
		<text class="node-text" x="500" y="170">A</text>
	</svg>
</div>
<button onclick={set}> set gsap </button>
<button onclick={add}> enable gsap </button>

<style>
	.container {
		background: #000;
		width: 100%;
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.path {
		fill: none;
		stroke: #333;
		stroke-width: 1;
	}

	#path-end {
		stroke: #8b5cf6;
	}
	.path-animation {
		fill: none;
		stroke-width: 1;
		/* stroke-dasharray: 100; */
		/* stroke-dashoffset: 100; */
		/* animation: dash 0.5s linear infinite; */
	}

	.node {
		fill: #111;
		stroke: #333;
		stroke-width: 1;
	}

	.center-node {
		stroke: #444;
		stroke-width: 1;
	}

	.node-text {
		fill: #666;
		font-family: sans-serif;
		font-size: 12px;
		text-anchor: middle;
		dominant-baseline: middle;
	}
</style>
