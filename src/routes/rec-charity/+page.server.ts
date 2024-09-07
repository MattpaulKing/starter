import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { newsletterSchema } from "./lib/schemas/newsletterSchema";
import { formInvalid, formSuccess } from "$lib/forms/formMessages";
import type { Actions, PageServerLoad } from "./$types";

export const actions = {
  newsletterSignUp: async ({ request }) => {
    const form = await superValidate(request, zod(newsletterSchema))
    if (!form.valid) {
      return formInvalid(form)
    }
    return formSuccess(form)
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals: { db } }) => {
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
    ],
    instructors: [
      {
        id: "1",
        name: "John Doe",
        role: "Founder and Executive Director",
        description: "John is a seasoned software engineer with a passion for education. He founded our organization to provide free programming courses to underserved communities, empowering them to build a brighter future."
      },
      {
        id: "2",
        name: "Sarah Adams",
        role: "Lead Instructor",
        description: "Sarah is an experienced software developer and educator. She leads our team of instructors, ensuring our courses are engaging, practical, and tailored to the needs of our students."
      },
      {
        id: "3",
        name: "Michael Roberts",
        role: "Volunteer Coordinator",
        description: "Michael is responsible for recruiting and managing our team of dedicated volunteers, who play a crucial role in the success of our programs."
      }
    ],
    newsletterForm: await superValidate(zod(newsletterSchema))
  }
}
