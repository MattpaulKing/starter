<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	let { children } = $props();
	setToaster();
	setModalStore();
</script>

<Toast />
<Modal />
<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	{@render children()}
</div>
