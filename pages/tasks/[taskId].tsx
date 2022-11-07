import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTask from "app/tasks/queries/getTask"
import deleteTask from "app/tasks/mutations/deleteTask"

export const Task = () => {
  const router = useRouter()
  const taskId = useParam("taskId", "number")
  const [deleteTaskMutation] = useMutation(deleteTask)
  const [task] = useQuery(getTask, { id: taskId })

  return (
    <>
      <Head>
        <title>Task {task.id}</title>
      </Head>

      <div>
        <h1>Task {task.id}</h1>
        <pre>{JSON.stringify(task, null, 2)}</pre>

        <Link href={Routes.EditTaskPage({ taskId: task.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTaskMutation({ id: task.id })
              await router.push(Routes.TasksPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTaskPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TasksPage()}>
          <a>Tasks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Task />
      </Suspense>
    </div>
  )
}

ShowTaskPage.authenticate = true
ShowTaskPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTaskPage
