<script lang="ts">
	import { route } from '$lib/ROUTES.js';
	import { FormContainer } from '$lib/forms/index.js';
	import { setFormStores } from '$lib/forms/setForm';
	import { todoSchema } from './lib/todoSchema.js';

	let { data } = $props();
	let form = setFormStores({ form: data.todoForm, schema: todoSchema });
</script>

<div class="flex mx-auto w-full h-full flex-col items-center justify-center">
	<FormContainer {form} action={route()}></FormContainer>
</div>
