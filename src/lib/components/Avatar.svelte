<script lang="ts">
	let {
		initials,
		class: classes = 'bg-surface-200-700-token h-10 w-10'
	}: {
		initials: string;
		class?: string;
	} = $props();
</script>

<figure
	class="avatar flex aspect-square text-surface-50 font-semibold rounded-full justify-center items-center overflow-hidden isolate {classes}"
>
	<svg class="avatar-initials w-full h-full" viewBox="0 0 512 512">
		<text
			x="50%"
			y="50%"
			dominant-baseline="central"
			text-anchor="middle"
			font-weight="bold"
			font-size={150}
			class="avatar-text fill-token"
		>
			{String(initials).substring(0, 2).toUpperCase()}
		</text>
	</svg>
</figure>
