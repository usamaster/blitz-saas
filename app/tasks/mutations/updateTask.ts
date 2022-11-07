import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateTask = z.object({
  id: z.number(),
  checked: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateTask),
  resolver.authorize(),
  async ({ id, checked, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const task = await db.task.update({
      where: { id },
      data: {
        ...data,
        checked: !checked,
      },
    })

    return task
  }
)
