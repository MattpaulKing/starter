import { error } from "@sveltejs/kit"

export const load = async ({ locals: { db }, params: { id } }) => {
  const courses = [
    {
      id: "1",
      title: "Introduction to Python Programming",
      description: "Learn the fundamentals of the Python programming language and build your first applications.",
      overview: `This course introduces students to the fundamentals of Python programming, focusing on core
				concepts and practical application. By the end of the course, students will have a solid
				understanding of Python basics and will be able to build simple applications.`,
      length: "12 weeks",
      skillLevel: "Beginner",
      hours: "2 hours per week",
      requirements: [
        "No prior programming experience is required.",
        "Basic computer skills and familiarity with using software applications."
      ],
      materialsProvided: [
        "Access to course slides and notes",
        "Sample code and exercises",
        "Project templates and guidelines"
      ],
      assessment: ["Weekly quizzes to test understanding of concepts", "A final project demonstrating the application of learned skills"],
      instructorSupport: ["Weekly office hours", "Online discussion forum for peer and instructor support"],
      weeks: [{
        title: "Week 1: Introduction to Python",
        lessons: [
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
        ]
      }, {
        title: "Week 2: Basic Python Syntax and Data Types",
        lessons: [
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
        ]
      }, {
        title: "Week 3: Control Structures",
        lessons: [
          {
            title: 'Lesson 3.1: Conditional Statements',
            content: ['if, elif, and else statements', 'Logical conditions and boolean expressions']
          },
          {
            title: 'Lesson 3.2: Loops',
            content: [
              'for loops and while loops',
              'Iterating over sequences (lists, tuples, strings)'
            ]
          },
          { title: 'Lesson 3.3: Loop Control', content: ['break, continue, andd pass statements'] }
        ]
      }, {
        title: "Week 4: Functions and Modules",
        lessons: [
          {
            title: 'Lesson 4.1: Defining and Calling Functions',
            content: ['Function syntax and structure', 'Parameters and return values']
          },
          {
            title: 'Lesson 4.2: Scope and Lifetime of Variables',
            content: ['Local and global variables']
          },
          {
            title: 'Lesson 4.3: Modules and Libraries',
            content: ['Importing standard libraries', 'Using import and from ... import']
          }
        ]
      },
      {
        title: "Week 5: Data Structures",
        lessons: [
          {
            title: 'Lesson 5.1: Lists',
            content: ['Creating, accessing, and manipulating lists', 'List methods and functions']
          },
          {
            title: 'Lesson 5.2: Tuples',
            content: ['Creating and using tuples', 'Tuple operations and immutability']
          },
          {
            title: 'Lesson 5.3: Dictionaries',
            content: [
              'Creating, accessing, and manipulating dictionaries',
              'Dictionary methods and use cases'
            ]
          }
        ]
      }, {
        title: "Week 6: File Handling",
        lessons: [
          {
            title: 'Lesson 6.1: Reading from Files',
            content: ['Opening, reading, and closing files']
          },
          {
            title: 'Lesson 6.2: Writing to Files',
            content: ['Writing data to files', 'Appending and modifying files']
          },
          {
            title: 'Lesson 6.3: Handling File Exceptions',
            content: ['Using try, except, and finally']
          }
        ]
      }]
    }
  ]
  return {
    course: courses.find((course) => course.id === id) ?? error(500)
  }
}
