<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { CourseWeek } from '../../lib/components';

	let { data } = $props();
</script>

<div class="flex flex-col lg:px-24 px-2 container my-12 h-full w-full">
	<h1 class="h1 font-bold text-7xl mb-12">Courses</h1>
	<div class="flex flex-col md:flex-row mx-auto w-full gap-x-36">
		<div class="flex flex-col [&>ul]:space-y-1 [&>ul>li]:mx-4">
			<h2 class="h2 col-start-1 text-balance font-bold mb-4 text-5xl">
				{data.course.title}
			</h2>
			<span class="font-bold mt-6">Course Overview: </span>
			<span>{data.course.overview}</span>
			<hr class="my-12" />
			<p><strong>Course Requirements:</strong></p>
			<ul>
				{#each data.course.requirements as requirement}
					<li>{requirement}</li>
				{/each}
			</ul>
			<p><strong>Materials Provided:</strong></p>
			<ul>
				{#each data.course.materialsProvided as material}
					<li>{material}</li>
				{/each}
			</ul>
			<p><strong>Assessment:</strong></p>
			<ul>
				{#each data.course.assessment as assessment}
					<li>{assessment}</li>
				{/each}
			</ul>
			<p><strong>Instructor Support:</strong></p>
			<ul>
				{#each data.course.instructorSupport as support}
					<li>{support}</li>
				{/each}
			</ul>
			<hr class="my-12" />
			<p>
				This curriculum is designed to be flexible and can be adjusted based on the pace and needs
				of the students.
			</p>
			<hr class="my-12" />
			<Accordion>
				{#each data.course.weeks as week}
					<AccordionItem>
						<svelte:fragment slot="summary">
							{week.title}
						</svelte:fragment>
						<svelte:fragment slot="content">
							<CourseWeek title={week.title} lessons={week.lessons} />
						</svelte:fragment>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
		<enhanced:img src="/static/python-logo.png" class="max-w-lg" alt="python-logo" />
	</div>
</div>
