<script lang="ts">
	let { data } = $props();
</script>

<div class="grid grid-rows-[auto_auto_auto] gap-y-16">
	<div
		class="w-full flex flex-col items-center justify-center h-96 min-h-max bg-[url('/dish.jpg')] bg-cover bg-no-repeat bg-center"
	>
		<h1 class="h1 font-bold text-white capitalize">About The Bull</h1>
	</div>
	<div class="flex flex-col items-center space-y-8 mx-2">
		<span class="prose text-center">
			From the team behind Vancouver’s award-winning restaurants The Bear, Undun, Branca, as well as
			New York City’s The Flea, Fantasy Group welcomes you to its first restaurant in the heart of
			BC’s beautiful capital city, Victoria – The Bull.
		</span>
		<span class="prose text-center">
			An avid free diver and fisherman, Executive Chef Carmy returns to his hometown with a menu
			that draws inspiration from memorable West Coast cuisine with an emphasis on local and
			globally sourced seafood.
		</span>
		<span class="prose text-center">
			The Bull features local and global seafood paired with high-quality sustainable ingredients
			that adhere to the highest standards. Guests can choose from a selection of nigiri, sashimi
			and sushi rolls at our stunning Japanese raw bar.
		</span>
		<span class="prose text-center">
			Our front-of-house team, led by Restaurant Director Richy, is passionate about delivering an
			unparalleled level of hospitality set within Marilena’s warm, contemporary dining room
			anchored by an open concept kitchen.
		</span>
		<span class="prose text-center">
			Marilena’s expansive wine list celebrates far-reaching varietals from notable regions while
			also honouring the Island’s premier wineries.
		</span>
	</div>
	<div class="flex flex-col items-center w-full mt-8">
		<div class="flex flex-col md:flex-row gap-x-8">
			<enhanced:img src="/static/chef.jpg" class="max-w-96" alt="Executive Chef Carmy" />
			<div class="flex flex-col space-y-4 mx-2 mt-8">
				<span class="font-heading-token tracking-widest uppercase font-bold"
					>Carmy, Executive Chef</span
				>
				<span class="prose">
					Returning to his hometown of Victoria, Executive Chef Carmy leads our culinary team at The
					Bull. Prior to our opening, Chef Carmy held positions in world renowned Michelin starred
					restaurants like Jean George in New York City, The French Laundry in Napa and Blackbird in
					Chicago. Most recently, Chef Carmy spent six years as Culinary Director for Vancouver
					based Hawksworth Restaurant Group, leading the Nightingale and Hawksworth teams
					respectively, achieving accolades such as Vancouver Magazine’s Chef of the Year in 2011
					and 2012.
				</span>
				<span class="prose">
					An avid free-diver and fisherman, Chef Carmy brings his passion for coastal cuisine to The
					Bull. Inspired by local offerings, his approachable dishes celebrate global flavours
					accented by seasonal ingredients, creating an unforgettable dining experience for our
					guests. Chef Carmy looks forward to delivering a hospitality experience that speaks to the
					Victoria community and to be able to contribute to the growing dining scene on Vancouver
					Island.
				</span>
			</div>
		</div>
	</div>
</div>
