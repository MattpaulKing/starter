<script lang="ts">
	import { SectionImg } from '../lib/components';
	let { data } = $props();
</script>

<div class="flex flex-col items-center container my-12 h-full w-full">
	<SectionImg>
		{#snippet title()}
			<h1 class="h1 font-bold text-7xl col-span-2 mb-12">About Us</h1>
		{/snippet}
		{#snippet children()}
			<h2 class="h2 text-5xl font-bold">Mission</h2>
			<span class="mt-4">
				At Spresso, our mission is to empower individuals of all ages and backgrounds through the
				transformative power of coding. We are dedicated to providing accessible, high-quality
				programming education to youth, seniors, and women, fostering skills that open doors to new
				opportunities and drive personal and professional growth. By creating an inclusive,
				supportive community of learners, we aim to bridge the digital divide, inspire innovation,
				and build a diverse and dynamic future in technology.
			</span>
			<h2 class="h2 text-5xl mt-12 font-bold">Vision</h2>
			<span class="mt-4">
				Our vision at Spresso is to cultivate a world where technology is a universal language,
				accessible to everyone regardless of age, gender, or background. We envision a future where
				youth, seniors, and women are empowered to shape the digital landscape with confidence and
				creativity, leading to a more inclusive and innovative tech industry. Through education and
				community support, we aspire to unlock potential, bridge gaps, and drive societal progress,
				ensuring that every individual has the tools and opportunities to thrive in the evolving
				world of technology.
			</span>
		{/snippet}
		{#snippet img()}
			<enhanced:img src="/static/classroom-computers.png" class="hidden lg:block" alt="classroom" />
		{/snippet}
	</SectionImg>
</div>
