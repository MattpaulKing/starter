<script lang="ts">
	import { CourseWeek } from '../lib/components';

	let { data } = $props();
</script>

<div class="flex flex-col lg:px-24 px-2 container my-12 h-full w-full">
	<h1 class="h1 font-bold text-7xl mb-12">Courses</h1>
	<div class="flex flex-col md:flex-row mx-auto w-full gap-x-36">
		<div class="flex flex-col">
			<h2 class="h2 col-start-1 font-bold mb-4 text-5xl">
				Introduction to <br /> Python Programming
			</h2>
			<span class="font-bold mt-6">Course Overview: </span>
			<span
				>This course introduces students to the fundamentals of Python programming, focusing on core
				concepts and practical application. By the end of the course, students will have a solid
				understanding of Python basics and will be able to build simple applications.</span
			>
			<CourseWeek
				title="Week 1: Introduction to Python"
				lessons={[
					{
						title: 'Lesson 1.1: What is Python?',
						content: ['History and evolution of Python', 'Applications and use cases']
					},
					{
						title: 'Lesson 1.2: Setting Up Your Development Environment',
						content: [
							'Installing Python',
							'Choosing and setting up an IDE (Integrated Development Environment) or code editor'
						]
					},
					{
						title: 'Lesson 1.3: Writing Your First Python Program',
						content: [
							'Syntax and structure of Python code',
							'Writing and running a basic "Hello, World!" program'
						]
					}
				]}
			/>
			<CourseWeek
				title="Week 2: Basic Python Syntax and Data Types"
				lessons={[
					{
						title: 'Lesson 2.1: Variables and Data Types',
						content: ['History and evolution of Python', 'Applications and use cases']
					},
					{
						title: 'Lesson 2.2: Basic Operators',
						content: [
							'Understanding variables, integers, floats, strings, and booleans',
							'Type conversion',
							'Arithmetic, comparison, and logical operators'
						]
					}
				]}
			/>
			<hr class="my-12" />
			<h4><strong>Week 3: Control Structures</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 3.1: Conditional Statements</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li><code>if</code>, <code>elif</code>, and <code>else</code> statements</li>
						<li>Logical conditions and Boolean expressions</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 3.2: Loops</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li><code>for</code> loops and <code>while</code> loops</li>
						<li>Iterating over sequences (lists, tuples, strings)</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 3.3: Loop Control</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li><code>break</code>, <code>continue</code>, and <code>pass</code> statements</li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<h4><strong>Week 4: Functions and Modules</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 4.1: Defining and Calling Functions</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Function syntax and structure</li>
						<li>Parameters and return values</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 4.2: Scope and Lifetime of Variables</strong>
					<ul class="space-y-1 [&>li]:mx-4"><li>Local and global variables</li></ul>
				</li>
				<li>
					<strong>Lesson 4.3: Modules and Libraries</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Importing standard libraries</li>
						<li>Using <code>import</code> and <code>from ... import</code></li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<h4><strong>Week 5: Data Structures</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 5.1: Lists</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Creating, accessing, and manipulating lists</li>
						<li>List methods and functions</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 5.2: Tuples</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Creating and using tuples</li>
						<li>Tuple operations and immutability</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 5.3: Dictionaries</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Creating, accessing, and manipulating dictionaries</li>
						<li>Dictionary methods and use cases</li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<h4><strong>Week 6: File Handling</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 6.1: Reading from Files</strong>
					<ul class="space-y-1 [&>li]:mx-4"><li>Opening, reading, and closing files</li></ul>
				</li>
				<li>
					<strong>Lesson 6.2: Writing to Files</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Writing data to files</li>
						<li>Appending and modifying files</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 6.3: Handling File Exceptions</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Using <code>try</code>, <code>except</code>, and <code>finally</code></li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<h4><strong>Week 7: Building Your First Application</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 7.1: Project Planning and Design</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Defining the scope and requirements of your application</li>
						<li>Designing a basic application flow</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 7.2: Coding Your Application</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Implementing core features</li>
						<li>Testing and debugging</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 7.3: Finalizing and Reviewing Your Application</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Reviewing code for efficiency and readability</li>
						<li>Preparing a final presentation of your project</li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<h4><strong>Week 8: Advanced Topics and Next Steps</strong></h4>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>
					<strong>Lesson 8.1: Introduction to Object-Oriented Programming (OOP)</strong>
					<ul class="space-y-1 [&>li]:mx-4"><li>Basic concepts of OOP: classes and objects</li></ul>
				</li>
				<li>
					<strong>Lesson 8.2: Exploring Python Libraries</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>
							Introduction to popular Python libraries (e.g., <code>requests</code>,
							<code>numpy</code>, <code>pandas</code>)
						</li>
					</ul>
				</li>
				<li>
					<strong>Lesson 8.3: Path Forward</strong>
					<ul class="space-y-1 [&>li]:mx-4">
						<li>Next steps for further learning</li>
						<li>Exploring advanced topics and specializations in Python</li>
					</ul>
				</li>
			</ul>
			<hr class="my-12" />
			<p><strong>Course Requirements:</strong></p>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>No prior programming experience is required.</li>
				<li>Basic computer skills and familiarity with using software applications.</li>
			</ul>
			<p><strong>Materials Provided:</strong></p>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>Access to course slides and notes</li>
				<li>Sample code and exercises</li>
				<li>Project templates and guidelines</li>
			</ul>
			<p><strong>Assessment:</strong></p>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>Weekly quizzes to test understanding of concepts</li>
				<li>A final project demonstrating the application of learned skills</li>
			</ul>
			<p><strong>Instructor Support:</strong></p>
			<ul class="space-y-1 [&>li]:mx-4">
				<li>Weekly office hours</li>
				<li>Online discussion forum for peer and instructor support</li>
			</ul>
			<hr class="my-12" />
			<p>
				This curriculum is designed to be flexible and can be adjusted based on the pace and needs
				of the students.
			</p>
		</div>
		<enhanced:img src="/static/python-logo.png" class="max-w-lg" alt="python-logo" />
	</div>
</div>

{#snippet course()}
	<div></div>
{/snippet}
