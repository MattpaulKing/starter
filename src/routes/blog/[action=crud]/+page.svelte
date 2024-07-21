<script lang="ts">
	import { FormContainer, FormTitle } from '$lib/forms';
	import { setFormStores } from '$lib/forms/setForm';
	import { postSchema } from '../lib/postSchema.js';
	import { route } from '$lib/ROUTES.js';
	import { Errors, Field, Input, Label } from '$lib/forms/inputs/index.js';
	import { RichText } from '$lib/forms/inputs/RichText/index.js';
	let { data } = $props();
	let form = setFormStores({ form: data.postForm, schema: postSchema });
</script>

<div class="flex flex-col w-full h-full items-center justify-center">
	<FormContainer {form} action={route('default /blog/[action=crud]', { action: data.action })}>
		<FormTitle>Post</FormTitle>
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
	</FormContainer>
</div>
