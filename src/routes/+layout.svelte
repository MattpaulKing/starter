<script lang="ts">
	import '../app.css';
	import { Modal, openModal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { route } from '$lib/ROUTES';
	import { page } from '$app/stores';
	let { children } = $props();
	setToaster();
	let modalStore = setModalStore();
	async function openNew() {
		return await openModal({
			modalStore,
			routes: { from: `${$page.url.pathname}${$page.url.search}`, to: route('/auth/login') },
			ref: await import('./auth/login/+page.svelte').then((r) => r.default)
		}).then((r) => console.log('layout', r));
	}
</script>

<Toast />
<Modal />
<button onclick={async () => await openNew()} class="btn variant-ghost w-fit">Open Modal</button>
<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	{@render children()}
</div>
