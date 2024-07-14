<script lang="ts">
	export let label: string;
</script>

<div class="col-span-2 flex w-full justify-between place-items-center">
	<h3 class="h3 font-bold">{label}</h3>
	<slot name="action" />
</div>
