import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateTask = z.object({
  label: z.string(),
  checked: z.boolean(),
})

export default resolver.pipe(resolver.zod(CreateTask), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const task = await db.task.create({
    data: {
      label: input.label,
      checked: false,
    },
  })

  return task
})
