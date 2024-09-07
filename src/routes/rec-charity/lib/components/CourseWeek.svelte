<script lang="ts">
	let {
		title,
		lessons
	}: {
		title: string;
		lessons: { title: string; content: string[] }[];
	} = $props();
</script>

<hr class="my-12" />
<h4 class="mb-2"><strong>{title}</strong></h4>
<ul class="space-y-1 [&>li]:mx-4">
	<li>
		{#each lessons as lesson}
			<strong>{lesson.title}</strong>
			<ul class="space-y-1 [&>li]:mx-4">
				{#each lesson.content as content}
					<li>{content}</li>
				{/each}
			</ul>
		{/each}
	</li>
</ul>
