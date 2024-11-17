<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { Breadcrumb, Avatar, Popover, LoadingSpinner } from '$lib/components';
	import { beforeNavigate } from '$app/navigation';
	import { setUser } from '$lib/db/auth/context.svelte';
	import { UserMenu } from '$lib/components/User/Menu';
	import { setUserSettings } from '$routes/user/settings/lib/context.svelte';
	import type { User } from '@supabase/supabase-js';

	let { data, children } = $props();

	setToaster();
	setModalStore();

	let user = $state<User | null>(null);
	if (data.user) {
		user = setUser(data.user);
	}

	let userSettings = setUserSettings(data.userSettings);

	let userMenuOpen = $state(false);
	let slowNav = $state(false);
	let navDelay: ReturnType<typeof setTimeout>;

	beforeNavigate(async (nav) => {
		navDelay = setTimeout(() => {
			slowNav = true;
		}, 300);
		await nav.complete.then(() => {
			if (navDelay) {
				clearTimeout(navDelay);
			}
		});
	});
</script>

<Toast />
<Modal />

<div class="flex scroll-smooth flex-col overflow-auto h-screen w-screen">
	<div class="sticky w-full flex h-fit py-2 px-4 bg-surface-100-800-token place-items-center">
		{#if slowNav}
			<div class="relative h-9 w-9">
				<LoadingSpinner class="h-9 w-9" />
			</div>
		{/if}
		<div class="flex w-full gap-x-8">
			<Breadcrumb />
		</div>

		{#if user}
			<Popover class="h-9" onClickOutside={() => (userMenuOpen = false)}>
				<button onclick={() => (userMenuOpen = !userMenuOpen)}>
					<Avatar
						initials="MK"
						class="{userMenuOpen
							? 'scale-110 ring-1 ring-secondary-500-400-token'
							: ''} bg-secondary-400-500-token h-9"
					/>
				</button>
				{#if userMenuOpen}
					<UserMenu />
				{/if}
			</Popover>
		{/if}
	</div>
	{@render children()}
</div>
