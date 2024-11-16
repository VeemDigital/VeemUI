// $lib/components/ui/form/index.js
import { z } from 'zod';

export function createForm(schema) {
	const formSchema = z.object(schema);

	function MyForm(initialValues = {}) {
		return {
			...Object.keys(schema).reduce(
				(acc, key) => ({
					...acc,
					[key]: {
						value: initialValues[key] ?? '',
						error: null,
						touched: false,
						dirty: false
					}
				}),
				{}
			),
			isValid: false,
			isDirty: false,
			errors: [],

			validate() {
				const values = {};
				for (const key of Object.keys(schema)) {
					values[key] = this[key].value;
				}

				const result = formSchema.safeParse(values);

				if (!result.success) {
					result.error.errors.forEach((error) => {
						const field = error.path[0];
						if (field) {
							this[field].error = error.message;
						}
					});
					this.errors = result.error.errors.map((e) => e.message);
					this.isValid = false;
				} else {
					for (const key of Object.keys(schema)) {
						this[key].error = null;
					}
					this.errors = [];
					this.isValid = true;
				}
			},

			setValue(field, value) {
				this[field].value = value;
				this[field].dirty = true;
				this.isDirty = true;
				if (this[field].touched) {
					this.validate();
				}
			},

			setTouched(field) {
				this[field].touched = true;
				this.validate();
			},

			reset() {
				for (const key of Object.keys(schema)) {
					this[key].value = initialValues[key] ?? '';
					this[key].error = null;
					this[key].touched = false;
					this[key].dirty = false;
				}
				this.isDirty = false;
				this.isValid = false;
				this.errors = [];
			}
		};
	}

	return MyForm;
}
