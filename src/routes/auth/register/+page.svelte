<script lang="ts">
	import { setFormStores } from '$lib/forms/setForm.js';
	import { registerSchema } from '../lib/schemas/registerSchema.js';
	import { route } from '$lib/ROUTES.js';
	import { Errors, Field, Input, Label } from '$lib/forms/inputs/index.js';
	import { FormContainer, FormTitle } from '$lib/forms/index.js';

	let { data } = $props();
	let form = setFormStores({
		form: data.registerForm,
		schema: registerSchema,
		onUpdate: ({ form, result: { type: status } }) => {
			if (form.valid && status === 'success') {
			}
		}
	});
</script>

<div class="flex flex-col w-full h-full items-center justify-center">
	<FormContainer {form} action={route('register /auth/register')}>
		<FormTitle>Register</FormTitle>
		<Field {form} path="firstName">
			<Label label="First Name" />
			<Input type="text" />
			<Errors />
		</Field>
		<Field {form} path="lastName">
			<Label label="Last Name" />
			<Input type="text" />
			<Errors />
		</Field>
		<Field class="col-span-2" {form} path="email">
			<Label label="Email" />
			<Input type="email" />
			<Errors />
		</Field>
		<Field {form} path="password">
			<Label label="Password" />
			<Input type="password" />
			<Errors />
		</Field>
		<Field {form} path="confirmPassword">
			<Label label="Confirm Password" />
			<Input type="password" />
			<Errors />
		</Field>
		<a class="anchor mt-4" href={route('/auth/login')}> I already have an account </a>
		<div class="flex w-full col-span-2 justify-end mt-6">
			<button
				class="variant-filled-success border-surface-400-500-token btn max-h-12 border capitalize shadow-md shadow-surface-300 dark:shadow-gray-800"
				>Submit</button
			>
		</div>
	</FormContainer>
</div>
