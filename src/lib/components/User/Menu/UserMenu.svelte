<script lang="ts">
	import { enhance } from '$app/forms';
	import { List } from '$lib/components';
	import { fade, slide } from 'svelte/transition';
	import { modeCurrent, setModeCurrent, setModeUserPrefers } from '@skeletonlabs/skeleton';
	import { getToaster } from '$lib/components/Toaster';
	import { route } from '$lib/ROUTES';
	import type { ActionResult } from '@sveltejs/kit';

	let toast = getToaster();

	//NOTE: FIXXXXXXX
	let lightmode = $state(false);
	let btnHovered = $state(false);

	function changeLightMode() {
		let newMode = !$modeCurrent;
		setModeCurrent(!$modeCurrent);
		setModeUserPrefers(newMode);
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				toast.add({ type: 'save', message: 'Preference Saved' });
				// $userSettings.general = result.data as Tables<'general_settings'>;
			} else if (result.type === 'failure') {
				toast.add({ type: 'error', message: 'Could not save, please try again.' });
			}
		};
	}
</script>

{#snippet label()}
	<span class="whitespace-nowrap text-lg font-bold">Settings</span>
{/snippet}

<List navList={false} {label} transition={slide} class="absolute right-0 top-full min-w-64">
	<li class="list-option">
		<form
			action={route('lightmode /user/settings')}
			use:enhance={changeLightMode}
			method="POST"
			class="w-full group flex gap-x-4 place-items-center"
		>
			<input hidden name="lightMode" value={!$modeCurrent} />
			<button
				onmouseover={() => (btnHovered = true)}
				onfocus={() => (btnHovered = true)}
				onmouseleave={() => (btnHovered = false)}
				onfocusout={() => (btnHovered = false)}
				class="w-full whitespace-nowrap flex gap-x-2"
			>
				{#if btnHovered}
					<span
						class="transition-opacity {lightmode
							? 'group-hover:hidden block'
							: 'group-hover:block hidden'}">Light mode</span
					>
					<img
						in:fade
						class="h-6 w-6 {lightmode
							? 'group-hover:hidden block'
							: 'group-hover:block hidden'} dark:invert"
						src="/Sun.png"
						alt="lightmode"
					/>
				{:else}
					<span
						class="transition-opacity {lightmode
							? 'group-hover:block hidden'
							: 'group-hover:hidden block'}">Dark mode</span
					>
					<img
						in:fade
						class="h-6 w-6 dark:invert {lightmode
							? 'group-hover:block hidden'
							: 'group-hover:hidden block'}"
						src="/MoonStars.png"
						alt="darkmode"
					/>
				{/if}
			</button>
		</form>
	</li></List
>
