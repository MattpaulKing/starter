<script lang="ts">
	let { href, class: classes }: { href: string; class?: string } = $props();
</script>

<a class="rounded-full {classes} border border-black border-r-4 border-b-4 btn-icon w-fit" {href}
	><img src="/ArrowRight.png" class="" alt="arrow" /></a
>
