<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { Breadcrumb, UserMenu, List } from '$lib/components';
	let { children } = $props();
	setToaster();
	setModalStore();
</script>

<Toast />
<Modal />
<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	<div class="sticky w-full flex h-fit py-2 px-4 bg-surface-100-800-token place-items-center">
		<Breadcrumb class="w-full" />
		<UserMenu>
			<List label="Hello World">
				<button class="btn btn-sm variant-ghost">1</button>
				<button class="btn btn-sm variant-ghost">2</button>
				<button class="btn variant-ghost">3</button>
			</List>
		</UserMenu>
	</div>
	{@render children()}
</div>
