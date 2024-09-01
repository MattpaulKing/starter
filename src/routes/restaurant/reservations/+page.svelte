<script lang="ts">
	import { DatePicker, Field, Label, Select } from '$lib/forms/inputs';
	import { setFormStores } from '$lib/forms/setForm.js';
	import { route } from '$lib/ROUTES.js';
	import { setFormCtx } from '$lib/forms/inputs/context.js';
	import { FormTitle } from '$lib/forms/index.js';
	import { reservationSchema } from '../lib/schemas/reservationSchema.js';
	import { getToaster } from '$lib/components/Toaster/toastContext.svelte.js';

	let { data } = $props();
	let toast = getToaster();
	let form = setFormStores({
		form: data.reservationForm,
		schema: reservationSchema,
		stores: { toast },
		opts: {
			onSubmit({ cancel }) {
				cancel();
				toast.add({ type: 'save', message: 'Just a demo :(' });
			}
		}
	});
	setFormCtx({ disabled: false });
	let guestLookups = [
		{ id: '1', label: '1 Guest' },
		{ id: '2', label: '2 Guests' },
		{ id: '3', label: '3 Guests' },
		{ id: '4', label: '4 Guests' },
		{ id: '5', label: '5 Guests' },
		{ id: '6', label: '6 Guests' }
	];
	let roomLookups = [
		{ id: 'terracee', label: 'Terrace' },
		{ id: 'patio', label: 'Patio' },
		{ id: 'dining', label: 'Dining Room' },
		{ id: 'bar', label: 'Bar' }
	];
	let timeLookups = [
		{ id: '12:00PM', label: '12:00PM' },
		{ id: '12:15PM', label: '12:15PM' },
		{ id: '12:30PM', label: '12:30PM' },
		{ id: '12:45PM', label: '12:45PM' },
		{ id: '1:00PM', label: '1:00PM' },
		{ id: '1:15PM', label: '1:15PM' },
		{ id: '1:30PM', label: '1:30PM' },
		{ id: '1:45PM', label: '1:45PM' },
		{ id: '2:00PM', label: '2:00PM' }
	];
</script>

<div class="flex flex-col items-center justify-center h-full w-full fixed">
	<form
		class="flex w-fit z-10 flex-col items-center bg-secondary-800 bg-opacity-95 p-4 rounded-token"
		method="POST"
		action={route('/restaurant/reservations')}
		use:form.enhance
	>
		<FormTitle class="text-white">Reservations</FormTitle>
		<div class="flex gap-x-4 place-items-center">
			<Field {form} path="reservationDate">
				<Label class="text-white font-bold" label="Date" />
				<DatePicker {form} />
			</Field>
			<Field {form} path="reservationDate">
				<Label class="text-white font-bold" label="Time" />
				<Select lookups={timeLookups} />
			</Field>
		</div>
		<div class="flex gap-x-4 place-items-center">
			<Field {form} path="guests">
				<Label class="text-white font-bold" label="Guests" />
				<Select lookups={guestLookups} />
			</Field>
			<Field {form} path="room" class="min-w-44">
				<Label class="text-white font-bold" label="Room" />
				<Select lookups={roomLookups} />
			</Field>
		</div>

		<button
			class="btn mt-6 self-end h5 w-fit variant-filled-primary shadow-lg border border-primary-600"
			>Find a Reservation</button
		>
	</form>
</div>

<div
	class="w-full flex flex-col justify-center h-96 min-h-max bg-[url('/restaurant-terrace.jpg')] bg-cover bg-no-repeat bg-center"
>
	<h1 class="h1 font-bold text-white capitalize ml-48">Terrace</h1>
</div>
<div
	class="w-full flex flex-col justify-center h-96 min-h-max bg-[url('/restaurant-patio.jpg')] bg-cover bg-no-repeat bg-center"
>
	<h1 class="h1 font-bold text-white capitalize ml-48">Patio</h1>
</div>
<div
	class="w-full flex flex-col justify-center h-96 min-h-max bg-[url('/restaurant-dining-room.jpg')] bg-cover bg-no-repeat bg-center"
>
	<h1 class="h1 font-bold text-white capitalize ml-48">Dining Room</h1>
</div>
<div
	class="w-full flex flex-col justify-center h-96 min-h-max bg-[url('/restaurant-bar.jpg')] bg-cover bg-no-repeat bg-center"
>
	<h1 class="h1 font-bold text-white capitalize ml-48">Bar</h1>
</div>
