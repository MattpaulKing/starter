<script lang="ts">
	import { getField } from './context';
	let { label }: { label: string | undefined } = $props();
	let { path, constraints } = getField();
</script>

<label for={path}>
	<div class="mb-1 flex h-8 w-full place-items-center justify-between gap-x-2">
		<span class={$constraints?.required ? 'field-required-label relative' : ''}>
			<slot name="label">
				{label}
			</slot>
		</span>
		<slot name="action" />
	</div>
</label>
