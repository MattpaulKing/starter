<script lang="ts">
	import { Field, Input, Label } from '$lib/forms/inputs';
	import { setFormStores } from '$lib/forms/setForm';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { newsletterSchema } from './lib/schemas/newsletterSchema.js';
	import { getToaster } from '$lib/components/Toaster/toastContext.svelte.js';
	import { setFormCtx } from '$lib/forms/inputs/context.js';
	import { route } from '$lib/ROUTES.js';

	let { data } = $props();
	let toast = getToaster();
	let form = setFormStores({
		form: data.newsletterForm,
		schema: newsletterSchema,
		stores: { toast },
		opts: {
			onSubmit({ cancel }) {
				cancel();
				toast.add({ type: 'save', message: 'Added to the newsletter' });
			}
		}
	});
	setFormCtx({ disabled: false });

	let videos = ['flexible', 'seniors', 'women'];
	let videoIdx = $state(0);

	onMount(() => {
		setInterval(() => {
			videoIdx += 1;
			if (videoIdx >= videos.length) {
				videoIdx = 0;
			}
		}, 5000);
	});
</script>

<div class="flex flex-col w-full">
	<div
		class="flex flex-col relative bg-gray-900 bg-opacity-85 justify-center items-center h-screen overflow-hidden w-full"
	>
		<div class="flex flex-col px-2 text-white lg:mr-96 mt-28">
			<h1 class="h1 text-7xl whitespace-nowrap font-bold">Spresso</h1>
			<span class="text-xl mt-2">Computer programming for everyone</span>
			<div class="flex gap-x-2 place-items-center mt-4 w-fit">
				<button class="btn variant-filled-warning">Donate</button>
				<button class="btn variant-filled-primary">Programs</button>
			</div>
		</div>
		{#key videoIdx}
			<video
				transition:fade={{ duration: 700 }}
				class="absolute top-1/2 left-1/2 -translate-x-1/2 min-w-full -translate-y-1/2 min-h-full -z-10"
				autoplay
				muted
				loop
			>
				<source src="/videos/{videos[videoIdx]}.mp4" type="video/mp4" />
				<track kind="captions" />
			</video>
		{/key}
	</div>
	<div class="flex mx-auto justify-center h-fit w-full bg-surface-50-900-token">
		<form
			method="POST"
			action={route('newsletterSignUp /rec-charity')}
			class="flex w-fit flex-col my-24"
			use:form.enhance
		>
			<h2 class="h2 underline mb-8 underline-offset-8">Newsletter</h2>
			<div class="flex gap-x-4 mb-6">
				<Field class="col-start-1 max-w-48 justify-self-end" {form} path="firstName">
					<Label label="First Name" />
					<Input type="text" />
				</Field>
				<Field class="col-start-2 max-w-48 justify-self-center" {form} path="lastName">
					<Label label="Last Name" />
					<Input type="text" />
				</Field>
				<Field class="col-start-3 max-w-48 justify-self-start" {form} path="email">
					<Label label="Email" />
					<Input type="email" />
				</Field>
			</div>
			<button class="btn variant-filled self-end w-fit">Submit</button>
		</form>
	</div>
	<div class="flex pb-12 flex-col px-2 h-screen items-center bg-surface-100-800-token">
		{#snippet programBio({ title, reversed }: { title: string; reversed: boolean })}
			<div
				class="flex flex-col w-fit mx-auto h-fit lg:flex-row mt-24 lg:gap-x-8 text-white {reversed
					? 'lg:flex-row-reverse'
					: ''}"
			>
				<div class="h-80 min-w-80 w-80 bg-gray-600"></div>
				<div class="grid grid-rows-[auto_auto_1fr]">
					<span class="font-bold mt-4 lg:mt-0 text-xl font-heading-token">{title}</span>
					<span class="text-white lg:max-w-96"
						>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum</span
					>
					<button
						class="btn variant-filled-primary self-end {reversed
							? 'justify-self-start'
							: 'justify-self-end'}">Register</button
					>
				</div>
			</div>
		{/snippet}
		{@render programBio({ title: 'Something', reversed: false })}
		{@render programBio({ title: 'Something Else', reversed: true })}
	</div>
</div>
