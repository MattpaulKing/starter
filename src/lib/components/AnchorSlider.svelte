<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		class?: string;
		active?: boolean;
		onclick?: () => void;
		children: Snippet;
	};
	let {
		href,
		class: classes = 'text-xl',
		active = false,
		onclick = () => null,
		children
	}: Props = $props();
</script>

<a
	{href}
	{onclick}
	class="{classes} {active ? 'cursor-default' : ''} group w-min pr-2 font-bold"
	data-sveltekit-reload
>
	<div class="relative w-full overflow-hidden">
		<span class="whitespace-nowrap {active ? 'underline' : ''}">
			{@render children()}
		</span>
		<div
			class="border-t-surface-100-800-token absolute -left-full bottom-0 w-full
      border-t-2 transition-transform duration-500 {active
				? ''
				: 'group-hover:motion-safe:translate-x-full'}"
		></div>
	</div>
</a>
