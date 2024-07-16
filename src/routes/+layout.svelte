<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { Breadcrumb, UserMenu } from '$lib/components';
	let { children } = $props();
	setToaster();
	setModalStore();
</script>

<Toast />
<Modal />
<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	<div class="sticky w-full flex h-fit py-2 px-4 bg-surface-100-800-token place-items-center">
		<Breadcrumb class="w-full" />
		<UserMenu></UserMenu>
	</div>
	{@render children()}
</div>
