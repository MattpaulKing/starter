<script lang="ts">
	import FormContainer from '$lib/forms/components/FormContainer.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { route } from '$lib/ROUTES.js';
	import { defaultFormOptions } from '$lib/forms/setForm.js';
	import { Errors, Input, Field, Label } from '$lib/forms/inputs';
	import { loginSchema } from '../lib/schemas/loginSchema.js';

	let { data } = $props();
	const form = superForm(data.loginForm, {
		...defaultFormOptions(loginSchema)
	});
</script>

<div class="mx-auto flex flex-col w-full items-center h-full justify-center">
	<FormContainer class="min-w-96" {form} action={route('signin /auth/login')}>
		<div class="flex flex-col col-span-2 h-full">
			<Field {form} path="email">
				<Label label="Email" />
				<Input type="email" />
				<Errors />
			</Field>
			<Field {form} path="password">
				<Label label="Password" />
				<Input type="password" />
				<Errors />
			</Field>
			<!-- BUG: CREATE LOST PW PAGE -->
			<a class="anchor mt-4" href={route('/auth/login')}>Lost password?</a>
			<div class="flex w-full justify-between mt-6">
				<a
					href={route('/auth/register')}
					class="variant-filled-secondary border-surface-400-500-token btn max-h-12 border capitalize shadow-md shadow-surface-300 dark:shadow-gray-800"
					>Register</a
				>
				<button
					class="variant-filled-primary border-surface-400-500-token btn max-h-12 border capitalize shadow-md shadow-surface-300 dark:shadow-gray-800"
					>Sign In</button
				>
			</div>
		</div>
	</FormContainer>
</div>
