import * as v from "valibot";

export const todoSchema = v.object({
  label: v.string(),
  description: v.string(),
  status: v.enum({
    done: 'done',
    inProgress: 'in progress',
    todo: 'todo'
  }),
  deadline: v.date()
})
