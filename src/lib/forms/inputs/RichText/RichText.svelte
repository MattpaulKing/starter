<script lang="ts">
	import { sanitizerSettings } from '$routes/blog/lib/sanitizerSettings';
	import { onMount } from 'svelte';
	import sanitizeHtml from 'sanitize-html';
	import { getField } from '../context';
	import { Editor } from '@tiptap/core';
	import Text from '@tiptap/extension-text';
	import Bold from '@tiptap/extension-bold';
	import Document from '@tiptap/extension-document';
	import Heading from '@tiptap/extension-heading';
	import Link from '@tiptap/extension-link';
	import Paragraph from '@tiptap/extension-paragraph';
	import BulletList from '@tiptap/extension-bullet-list';
	import ListItem from '@tiptap/extension-list-item';
	import TextCommandBtn from './TextCommandBtn.svelte';
	import { List, Popover } from '$lib/components';

	let { value, disabled, errors, path } = getField<string>();

	let headingMenuOpen = $state(false);
	let headingLevels = [1, 2, 3] as const;

	let inputEl: HTMLDivElement | undefined = $state();
	let editor: Editor | undefined = $state();

	onMount(() => {
		editor = new Editor({
			element: inputEl,
			editable: !$disabled,
			editorProps: {
				attributes: {
					class: 'focus:outline-none h-full'
				}
			},
			extensions: [
				Document,
				Text,
				Paragraph.configure({ HTMLAttributes: { class: 'my-0' } }),
				Heading.configure({
					levels: [1, 2, 3],
					HTMLAttributes: { class: 'text-token' }
				}),
				Bold.configure({
					HTMLAttributes: { class: 'text-token' }
				}),
				Link.configure({
					HTMLAttributes: { class: 'anchor' }
				}),
				BulletList.configure({
					HTMLAttributes: { class: 'list-disc list-outside' }
				}),
				ListItem.configure({ HTMLAttributes: { class: '' } })
			],
			content: $value,
			onTransaction: () => {
				editor = editor;
				boldActive = editor?.isActive('bold');
				headingActive = editor?.isActive('heading');
				bulletListActive = editor?.isActive('bulletList');
			},
			onUpdate: () => {
				$value = sanitizeHtml(editor?.getHTML() ?? '', sanitizerSettings);
			}
		});
	});
	function handleClear() {
		editor?.commands.clearContent();
		editor?.commands.focus();
		$value = '';
	}
	let boldActive = $state<boolean | undefined>();
	let headingActive = $state<boolean | undefined>();
	let bulletListActive = $state<boolean | undefined>();
</script>

{#snippet headingMenuLabel()}
	<span class="">Heading Sizes</span>
{/snippet}

<input hidden type="text" bind:value name={path} />
<div
	class="input flex h-full max-h-40 w-full flex-col p-0.5 {$errors
		? 'border-error-500-400-token'
		: ''} {$disabled ? 'cursor-not-allowed' : 'cursor-text'}"
>
	{#if editor}
		<div role="menubar" tabindex="-1" class="bg-surface-200-700-token flex h-8 w-full">
			<Popover class="h-9" onClickOutside={() => (headingMenuOpen = false)}>
				<TextCommandBtn active={headingActive} onclick={() => (headingMenuOpen = true)}>
					<span class="font-normal">Aa</span>
				</TextCommandBtn>
				{#if headingMenuOpen}
					<div class="absolute z-10">
						<List label={headingMenuLabel} class="w-fit min-w-max">
							{#each headingLevels as headingLevel}
								<li>
									<button
										onclick={() =>
											editor?.chain().focus().toggleHeading({ level: headingLevel }).run()}
										class="list-option mx-0 whitespace-nowrap {editor.isActive('heading', {
											level: headingLevel
										})
											? 'variant-ghost'
											: ''}">Heading {headingLevel}</button
									>
								</li>
							{/each}
						</List>
					</div>
				{/if}
			</Popover>
			<TextCommandBtn
				active={boldActive}
				onclick={() => {
					editor?.chain().focus().toggleBold().run();
				}}
			>
				B
			</TextCommandBtn>
			<TextCommandBtn
				active={bulletListActive}
				onclick={() => editor?.chain().focus().toggleBulletList().run()}
			>
				<img
					class="dark:invert {bulletListActive ? 'dark:filter-none' : ''}"
					src="/ListBullets.png"
					alt="list"
				/>
			</TextCommandBtn>
			<div class="flex w-full justify-end px-1">
				<div class="bg-surface-300-600-token mx-2 h-full w-0.5"></div>
				<TextCommandBtn class="border-r-0" active={false} onclick={handleClear}>
					<img class="dark:invert" src="/Prohibit.png" alt="clear" />
				</TextCommandBtn>
			</div>
		</div>
	{/if}
	<hr class="border-b-2! border-white" />
	<div
		class="text-token prose p-2 h-full min-h-20 w-full flex-1 overflow-y-auto border-none ring-0"
		onclick={() => editor?.commands.focus()}
		onkeydown={() => editor?.commands.focus()}
		tabindex="-1"
		role="textbox"
		bind:this={inputEl}
		aria-invalid={!!$errors?.length}
	></div>
</div>

<style>
	.ProseMirror {
		height: 100%;
	}
</style>
