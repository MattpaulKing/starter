<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { setUser } from '$lib/db/auth/context.svelte';
	import type { User } from '@supabase/supabase-js';

	let { data, children } = $props();

	setToaster();
	setModalStore();

	let user = $state<User | null>(null);
	if (data.user) {
		user = setUser(data.user);
	}
</script>

<Toast />
<Modal />

{@render children()}
