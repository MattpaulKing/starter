<script lang="ts">
	import { FormContainer, FormTitle } from '$lib/forms';
	import { setFormStores } from '$lib/forms/setForm';
	import { postSchema } from '../lib/postSchema.js';
	import { route } from '$lib/ROUTES.js';
	import { Errors, Field, Input, Label } from '$lib/forms/inputs/index.js';
	import { RichText } from '$lib/forms/inputs/RichText/index.js';
	import { getModalStore } from '$lib/components/Modal/context.js';
	import { getToaster } from '$lib/components/Toaster/toastContext.svelte.js';
	import { ModalCloseBtn } from '$lib/components/Modal/index.js';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	let { data } = $props();
	let modalStore = getModalStore();

	let form = setFormStores({
		form: data.postForm,
		schema: postSchema,
		stores: { toast: getToaster() },
		opts: {
			dataType: 'json',
			onUpdate({ form }) {
				if (form.valid && modalStore.showing) {
					pushState(modalStore.queue[modalStore.showingIdx].routes.from, $page.data);
					modalStore.close();
				}
			}
		}
	});
</script>

<div class="flex flex-col h-full items-center justify-center w-full">
	<FormContainer
		class="lg:w-[512px] xl:w-[1024px]"
		{form}
		action={route('default /blog/[action=crud]', { action: data.action })}
	>
		<FormTitle><span class="capitalize">{data.action}</span> Post</FormTitle>
		<Field class="col-span-2" {form} path="label">
			<Label label="Title" />
			<Input type="text" />
			<Errors />
		</Field>
		<Field class="col-span-2" {form} path="content">
			<Label label="Post Content" />
			<RichText />
			<Errors />
		</Field>
		<div class="flex mt-6 col-span-2 justify-between">
			{#if modalStore.showing}
				<ModalCloseBtn />
			{:else}
				<div></div>
			{/if}
			<button class="btn variant-filled-success">Save</button>
		</div>
	</FormContainer>
</div>
