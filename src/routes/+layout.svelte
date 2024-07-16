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
	<div class="sticky w-full flex h-fit p-2 bg-surface-100-800-token place-items-center">
		<span class="text-lg font-bold">MK Blog</span>
	</div>
	{@render children()}
</div>
