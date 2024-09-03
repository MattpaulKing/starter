<script lang="ts">
	let { data } = $props();
	let menus = ['main', 'dessert', 'drinks'];
	type MenuItem = { label: string; category: string; ingredients: string; price: number };
</script>

{#snippet menuItem(item: MenuItem)}
	<div class="flex max-w-96 flex-col w-fit h-min">
		<div class="flex gap-x-4">
			<span class="uppercase tracking-widest whitespace-nowrap font-bold">{item.label}</span>
			<span class="text-yellow-600">{item.price}</span>
		</div>
		<span>{item.ingredients}</span>
	</div>
{/snippet}
<div class="grid items-center grid-rows-[auto_auto] gap-y-12">
	<div
		class="w-full flex flex-col items-center justify-center h-96 min-h-max bg-[url('/salad.jpg')] bg-cover bg-no-repeat bg-center"
	>
		<h1 class="h1 font-bold text-white capitalize">{data.selectedMenu} Menu</h1>
	</div>
	<div class="justify-center flex gap-x-8">
		{#each menus as menu}
			<a
				href="/restaurant/menu/{menu}"
				class="capitalize {menu === data.selectedMenu ? 'text-yellow-600' : ''}">{menu}</a
			>
		{/each}
	</div>
	<div class="grid grid-cols-1 gap-y-6 lg:grid-cols-2 justify-self-center w-fit gap-x-16">
		{#each data.menu.sections as menuSection}
			<span class="font-heading-token tracking-widest text-4xl col-span-2">{menuSection}</span>
			{#each data.menu.items.filter(({ category }) => category === menuSection) as dish}
				{@render menuItem(dish)}
			{/each}
			<hr class="col-span-2 my-4" />
		{/each}
	</div>
</div>
