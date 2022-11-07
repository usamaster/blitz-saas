import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTaskmaster from "app/taskmasters/queries/getTaskmaster"
import deleteTaskmaster from "app/taskmasters/mutations/deleteTaskmaster"

export const Taskmaster = () => {
  const router = useRouter()
  const taskmasterId = useParam("taskmasterId", "number")
  const [deleteTaskmasterMutation] = useMutation(deleteTaskmaster)
  const [taskmaster] = useQuery(getTaskmaster, { id: taskmasterId })

  return (
    <>
      <Head>
        <title>Taskmaster {taskmaster.id}</title>
      </Head>

      <div>
        <h1>Taskmaster {taskmaster.id}</h1>
        <pre>{JSON.stringify(taskmaster, null, 2)}</pre>

        <Link href={Routes.EditTaskmasterPage({ taskmasterId: taskmaster.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTaskmasterMutation({ id: taskmaster.id })
              await router.push(Routes.TaskmastersPage())
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

const ShowTaskmasterPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TaskmastersPage()}>
          <a>Taskmasters</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Taskmaster />
      </Suspense>
    </div>
  )
}

ShowTaskmasterPage.authenticate = true
ShowTaskmasterPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTaskmasterPage
