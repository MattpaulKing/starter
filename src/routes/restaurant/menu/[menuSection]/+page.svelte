<script lang="ts">
	let { data } = $props();
	let menus = ['main', 'dessert', 'brunch', 'drinks', 'wine'];
	type MenuItem = { label: string; category: string; ingredients: string; price: number };
	let menuItems = [
		{
			label: 'BEEF TENDERLOIN CARPACCIO',
			category: 'starters + shares',
			ingredients:
				'chimichurri aioli, fried capers, arugula, citrus vinaigrette, parmesan, crispy bread',
			price: 22
		},
		{
			label: 'AHI TUNA TATAKI',
			category: 'starters + shares',
			ingredients:
				'mango cucumber salsa, maple ginger soy, wasabi ginger aioli, crushed mesquite potato chips',
			price: 23
		},
		{
			label: 'TRUFFLE FRITES',
			category: 'starters + shares',
			ingredients: 'parmesan, fresh herbs, white truffle oil, roasted garlic aioli',
			price: 14
		},
		{
			label: 'TACOS AL PASTOR',
			category: 'starters + shares',
			ingredients:
				'marinated + grilled pork shoulder, roasted pineapple, pickled onions, avocado lime crema, cilantro, corn tortilla chips, tomato salsa',
			price: 20
		},
		{
			label: 'FLATBREAD',
			category: 'flatbread pizzas',
			ingredients: 'rosemary, parmesan, cracked pepper, gorgonzola cream',
			price: 12
		},
		{
			label: 'FIG + PROSCIUTTO FLATBREAD',
			category: 'flatbread pizzas',
			ingredients:
				'gorgonzola cream, shaved prosciutto, black mission figs, herb ricotta, arugula, honey chili glaze, balsamic reduction',
			price: 22
		},
		{
			label: 'NEW YORK CLASSIC',
			category: 'flatbread pizzas',
			ingredients:
				'pomodoro sauce, mozzarella, double pepperoni, chili flakes, parmesan dust, olive oil',
			price: 20
		},
		{
			label: 'BOURBON BARBECUE RIBS',
			category: 'mains',
			ingredients:
				'potato bacon salad, seasonal vegetables, bourbon barbecue sauce, pineapple salsa',
			price: 34
		},
		{
			label: 'PAN SEARED MISO HALIBUT',
			category: 'mains',
			ingredients:
				'okonomiyaki cabbage cake, kewpie mayo, seasonal vegetables, lemongrass ginger compound butter, micro salad',
			price: 38
		},
		{
			label: 'BLACKENED CREOLE CHICKEN',
			category: 'mains',
			ingredients:
				'roasted skin on breast, garlic whipped potatoes, seasonal vegetables, signature glo butter',
			price: 29
		},
		{
			label: '6OZ NEW YORK STRIPLOIN',
			category: 'chophouse',
			ingredients: '',
			price: 34
		},
		{
			label: '8OZ NEW YORK STRIPLOIN',
			category: 'chophouse',
			ingredients: '',
			price: 40
		},
		{
			label: '7OZ BEEF TENDERLOIN',
			category: 'chophouse',
			ingredients: '',
			price: 45
		}
	];
	let menuSections = ['starters + shares', 'flatbread pizzas', 'mains', 'chophouse'];
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
		<h1 class="h1 font-bold text-white capitalize">{data.menuSection} Menu</h1>
	</div>
	<div class="justify-center flex gap-x-8">
		{#each menus as menu}
			<a
				href="/restaurant/menu/{menu}"
				class="capitalize {menu === data.menuSection ? 'text-yellow-600' : ''}">{menu}</a
			>
		{/each}
	</div>
	<div class="grid grid-cols-1 gap-y-6 lg:grid-cols-2 justify-self-center w-fit gap-x-16">
		{#each menuSections as menuSection}
			<span class="font-heading-token tracking-widest text-4xl col-span-2">{menuSection}</span>
			{#each menuItems.filter(({ category }) => category === menuSection) as dish}
				{@render menuItem(dish)}
			{/each}
			<hr class="col-span-2 my-4" />
		{/each}
	</div>
</div>
