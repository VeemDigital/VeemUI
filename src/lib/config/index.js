export class VeemUIConfig {
	constructor(theme) {
		for (const [key, value] of Object.entries(theme)) {
			// console.log(key);
			document.documentElement.style.setProperty(`--${key}`, value);
		}
	}
}
