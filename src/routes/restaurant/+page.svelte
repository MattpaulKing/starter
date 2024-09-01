<script lang="ts">
	let { data } = $props();
</script>

<div class="layout flex flex-col justify-center lg:grid grid-cols-5 items-center h-full">
	<div class="flex flex-col items-center lg:col-start-2 rounded-lg w-fit h-fit p-4">
		<h1 class="h1 text-7xl lg:text-8xl whitespace-nowrap text-white font-bold mb-6 text-center">
			The Bull
		</h1>
		<a
			href="/restaurant/reservations"
			class="btn h5 w-fit variant-filled-primary shadow-lg border border-primary-600"
			>Make a Reservation</a
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
