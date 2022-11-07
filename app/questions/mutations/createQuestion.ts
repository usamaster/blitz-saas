import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CreateQuestion } from "../validations"

export default resolver.pipe(resolver.zod(CreateQuestion), resolver.authorize(), async (input) => {
  const question = await db.question.create({
    data: {
      ...input,
      choices: { create: input.choices },
    },
  })

  return question
})
