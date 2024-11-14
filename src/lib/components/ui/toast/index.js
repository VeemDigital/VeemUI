import Toaster from './toaster.svelte';
import { mount, unmount } from 'svelte';
import gsap from 'gsap';

/**
 * Class representing a Toast notification.
 */
class Toast {
	constructor() {
		if (typeof document === 'undefined') return;
		this.parent = this.createParentDiv();
		/**
		 * @typedef ToastComponent
		 * @type {object}
		 * @property {any} mountComp - The day number.
		 * @property {number} index - Indicates if the day belongs to the current month.
		 * @property {number} nbDelete - Indicates if the day should be disabled.
		 */
		/** @type {ToastComponent[]} */
		this.toasts = [];
		this.i = 0;
		this.nbDelete = 0;
		this.zIndexCounter = 1000;
	}

	/**
	 * Create a parent div element to hold the toast notifications.
	 * @returns {HTMLDivElement} The parent div element.
	 */
	createParentDiv() {
		let parentDiv = document.createElement('div');
		parentDiv.style.cssText = `position: fixed;
      top: 0;
      right: 0;
      height: 30vh;
      width: 30%;`;
		return document.body.appendChild(parentDiv);
	}

	/**
	 * Show a toast notification.
	 * @param {string} message - The message to display in the toast.
	 */
	show(message) {
		const svelteComponent = mount(Toaster, {
			target: this.parent,
			props: { message }
		});

		let toastComponent = {
			mountComp: svelteComponent,
			index: this.toasts.length,
			nbDelete: this.nbDelete
		};

		this.toasts.push(toastComponent);
		let child = this.parent?.children;
		let length = this.parent?.children.length;
		gsap.set(child[length - 1], { y: 30 * length, zIndex: this.zIndexCounter });
		gsap.from(child[length - 1], {
			opacity: 0,
			duration: 1.5
		});
		setTimeout(() => this.handleToastComplete(toastComponent), 3000 * length);
		if (this.zIndexCounter == undefined) return;
		this.zIndexCounter -= 1;
	}

	/**
	 * Handle the completion of the toast animation.
	 * Once the animation completes, remove the toast from the queue and destroy the component.
	 * @param {Object} toastComponent - The mounted toast component.
	 */
	handleToastComplete(toastComponent) {
		this.toasts.shift();
		let parent = this.parent;
		let target = parent?.children[0];
		let length = parent?.children.length;
		let children = [].slice.call(parent?.children);
		gsap.to(target, {
			opacity: 0,
			duration: 0.5,
			onComplete: () => {
				unmount(toastComponent.mountComp);
				gsap.to(children, {
					yPercent: -30 * (this.i - toastComponent.nbDelete),
					duration: 1,
					ease: 'power4.inOut'
				});
			}
		});
		this.nbDelete += 1;
		this.i += 1;
	}
}

export const toast = new Toast();
