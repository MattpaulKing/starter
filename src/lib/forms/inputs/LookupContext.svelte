<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { getField, setLookups } from './context';
	import type { LookupOption } from '../types';

	export let lookups: LookupOption[] = [];

	let { value } = getField<string[] | string>();
	let _lookups = writable(lookups);
	setLookups({
		lookups: writable(lookups),
		selected: derived([_lookups, value], ([$lookups, $value]) => {
			if (!Array.isArray($value)) {
				return $lookups.filter(({ id }) => $value === id);
			}
			return $lookups.filter(({ id }) => $value.includes(id));
		})
	});
</script>

<slot />
