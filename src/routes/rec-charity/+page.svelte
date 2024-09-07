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

<div class="flex flex-col items-center w-full">
	<section
		class="flex flex-col relative bg-gray-900 bg-opacity-85 justify-center h-screen overflow-hidden w-full"
	>
		<div class="flex flex-col px-2">
			<div class="container max-w-2xl lg:ml-48 text-white mt-28">
				<h1 class="h1 text-3xl lg:text-7xl whitespace-nowrap font-bold">
					Empowering the Next <br /> Generation of Coders
				</h1>
				<span class="text-xl mt-2"
					>Our charity organization is dedicated to providing free programming courses to
					underserved communities, helping them unlock their full potential and build a brighter
					future.</span
				>
				<div class="flex gap-x-2 place-items-center mt-6 w-fit">
					<button class="btn variant-filled-warning">Donate</button>
					<button class="btn variant-filled">Programs</button>
				</div>
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
	</section>

	<section class="flex flex-col my-12 lg:my-24 px-2 w-full">
		<div class="flex flex-col mb-12 lg:ml-48 space-y-4 lg:space-y-8">
			<div class="flex flex-col">
				<h2 class="h2 text-3xl tracking-tight lg:text-7xl text-balance font-bold">
					Our Programming Courses
				</h2>
				<span class="text-lg ml-2 mt-6 text-pretty lg:max-w-2xl">
					We offer a range of programming courses tailored to students of all skill levels, from
					beginner to advanced. Our curriculum is designed to provide a solid foundation in coding
					principles and practical, real-world applications.</span
				>
			</div>
			<div class="flex flex-col lg:flex-row mx-auto w-full gap-y-10 gap-x-10 place-items-start">
				{#each data.courses as course}
					{@render programmingCourse(course)}
				{/each}
			</div>
		</div>
	</section>

	<section class="flex flex-col my-12 lg:my-24 px-2 w-full">
		<div class="flex flex-col mb-12 lg:ml-48 space-y-4 lg:space-y-8">
			<div class="flex flex-col">
				<h2 class="h2 text-3xl lg:text-7xl font-bold">The Team</h2>
				<span class="text-lg max-w-2xl ml-4 mt-6">
					Our dedicated team of instructors and volunteers are passionate about empowering the next
					generation of coders. Get to know the key members of our organization.</span
				>
			</div>
			<div
				class="flex flex-col lg:flex-row gap-y-10 mx-auto h-max w-full gap-x-10 place-items-center"
			>
				{#each data.instructors as instructor}
					{@render instructorBio(instructor)}
				{/each}
			</div>
		</div>
	</section>

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
</div>

{#snippet programmingCourse({
	id,
	title,
	description,
	length,
	skillLevel,
	hours
}: {
	id: string;
	title: string;
	description: string;
	length: string;
	skillLevel: string;
	hours: string;
})}
	<div
		class="flex h-96 flex-col card p-4 max-w-96 justify-between border-surface-300-600-token rounded-lg border"
	>
		<span class="text-xl font-bold">{title}</span>
		<span class="mt-2">{description}</span>
		<div class="grid grid-cols-[auto_1fr] gap-x-2 mt-6">
			<img src="/Calendar.png" class="dark:invert" alt="cal" />
			<span>{length}</span>
			<img src="/UsersThree.png" class="dark:invert" alt="users" />
			<span>{skillLevel}</span>
			<img src="/ClockCounterClockwise.png" class="dark:invert" alt="clock" />
			<span>{hours}</span>
		</div>
		<a href="/rec-charity/programs/{id}" class="btn mt-6 self-start variant-filled">Learn More</a>
	</div>
{/snippet}
{#snippet instructorBio({
	name,
	role,
	description
}: {
	name: string;
	role: string;
	description: string;
})}
	<div
		class="flex flex-col card h-64 p-4 max-w-96 gap-y-3 border-surface-300-600-token rounded-lg border"
	>
		<div class="flex flex-col">
			<span class="text-xl font-bold">{name}</span>
			<span class="mt-1">{role}</span>
		</div>
		<span class="text-surface-700-200-token">{description}</span>
	</div>
{/snippet}
