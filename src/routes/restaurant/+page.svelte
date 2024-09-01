<script lang="ts">
	let { data } = $props();
</script>

<div class="layout flex flex-col justify-center lg:grid grid-cols-5 items-center h-full">
	<div class="flex flex-col items-center col-start-2 lg:col-start-4 rounded-lg w-fit h-fit p-4">
		<h1 class="h1 text-8xl whitespace-nowrap text-black font-bold mb-6 text-center">The Bull</h1>
		<button class="btn h5 w-fit variant-filled-primary shadow-lg border border-primary-600"
			>Make a Reservation</button
		>
	</div>
</div>

<style>
	.layout {
		background-image: url('/restaurant-dining-room.jpg') !important;
		background-attachment: fixed !important;
		background-position: center !important;
		background-repeat: no-repeat !important;
		background-size: cover !important;
	}
</style>
