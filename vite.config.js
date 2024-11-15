import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import postcss from 'rollup-plugin-postcss';

export default defineConfig({
	plugins: [
		sveltekit()
		// postcss({
		// 	extract: true,
		// 	minimize: true,
		// 	sourceMap: true
		// })
	]
});
