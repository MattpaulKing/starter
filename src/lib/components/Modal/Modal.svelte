<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { getModalStore } from './context';
	import type { Modal } from './store.svelte';

	let modals = getModalStore();
	let activeModal: null | Modal = $state(null);

	function restoreModalOnForward(e: PopStateEvent & { currentTarget: Window }) {
		if (e.currentTarget.location.search.includes('modal=true') && modals.lastPop) {
			modals.add(modals.lastPop);
		} else if (!e.currentTarget.location.search.includes('modal=true') && modals.showing) {
			modals.close();
		} else if (!e.currentTarget.location.search.includes('modal=true') && !modals.showing) {
			modals.lastPop = null;
		}
	}
	$effect(() => {
		if (modals.showing) {
			activeModal = modals.queue[modals.showingIdx];
		} else {
			activeModal = null;
		}
	});
	function closeModal() {
		if (!activeModal) return;
		modals.queue[modals.showingIdx].response({ type: 'close' });
		pushState(modals.queue[modals.showingIdx].routes.from, $page.data);
		modals.close();
	}
	function onkeydown({ key }: KeyboardEvent) {
		if (key === 'Escape') {
			closeModal();
		}
	}
	function clickedWithinModal(e: MouseEvent) {
		if (!modalContainer?.contains(e.target as Node | null)) {
			return false;
		}
		return true;
	}
	function onclick(e: MouseEvent) {
		if (!clickedWithinModal(e)) {
			closeModal();
		}
	}
	let backdropEl = $state<HTMLElement | undefined>();
	let modalContainer = $state<HTMLElement | undefined>();
</script>

<svelte:window onpopstate={restoreModalOnForward} />
{#if activeModal}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={backdropEl}
		role="dialog"
		aria-modal={true}
		{onclick}
		{onkeydown}
		class="absolute z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-surface-backdrop-token"
	>
		<div bind:this={modalContainer}>
			<svelte:component this={activeModal.ref} {...activeModal.props()}></svelte:component>
		</div>
	</div>
{/if}
