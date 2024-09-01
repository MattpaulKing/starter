<script lang="ts">
	import { DateTimePicker, Field, Label, Select } from '$lib/forms/inputs';
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
		opts: {}
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
		{ id: 'dining', label: 'Dining Room' },
		{ id: 'patio', label: 'Patio' },
		{ id: 'bar', label: 'Bar' }
	];
</script>

<div class="flex flex-col justify-center h-full w-full items-center">
	<form
		class="flex flex-col items-center"
		method="POST"
		action={route('/restaurant/reservations')}
		use:form.enhance
	>
		<FormTitle>Reservations</FormTitle>
		<div class="flex gap-x-4 place-items-center">
			<Field {form} path="guests">
				<Label label="Guests" />
				<Select lookups={guestLookups} />
			</Field>
			<Field {form} path="room" class="min-w-44">
				<Label label="Room" />
				<Select lookups={roomLookups} />
			</Field>
		</div>
		<Field {form} path="reservationDate">
			<Label label="Reservation Time" />
			<DateTimePicker {form} />
		</Field>
		<button
			class="btn mt-6 self-end h5 w-fit variant-filled-primary shadow-lg border border-primary-600"
			>Find a Reservation</button
		>
	</form>
</div>
