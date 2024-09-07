
export const load = async ({ locals: { db } }) => {
  return {
    courses: [
      {
        id: "1",
        title: "Introduction to Python",
        description: "Learn the fundamentals of the Python programming language and build your first applications.",
        length: "12 weeks",
        skillLevel: "Beginner",
        hours: "2 hours per week"
      }, {
        id: "2",
        title: "Web Development With React",
        description: "Dive into the world of modern web development using the popular React JavaScript library.",
        length: "16 weeks",
        skillLevel: "Intermediate",
        hours: "3 hours per week"
      }, {
        id: "3",
        title: "Advanced Algorithms and Data Structures",
        description: "Enhance your problem-solving skills and master advanced data structures and algorithms.",
        length: "20 weeks",
        skillLevel: "Advanced",
        hours: "4 hours per week"
      }
    ]
  }
}
