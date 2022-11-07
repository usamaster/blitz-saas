import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteQuestion = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteQuestion), resolver.authorize(), async ({ id }) => {
  await db.choice.deleteMany({ where: { questionId: id } })
  const question = await db.question.deleteMany({ where: { id } })

  return question
})
