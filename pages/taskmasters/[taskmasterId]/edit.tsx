import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTaskmaster from "app/taskmasters/queries/getTaskmaster"
import updateTaskmaster from "app/taskmasters/mutations/updateTaskmaster"
import { TaskmasterForm, FORM_ERROR } from "app/taskmasters/components/TaskmasterForm"

export const EditTaskmaster = () => {
  const router = useRouter()
  const taskmasterId = useParam("taskmasterId", "number")
  const [taskmaster, { setQueryData }] = useQuery(
    getTaskmaster,
    { id: taskmasterId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTaskmasterMutation] = useMutation(updateTaskmaster)

  return (
    <>
      <Head>
        <title>Edit Taskmaster {taskmaster.id}</title>
      </Head>

      <div>
        <h1>Edit Taskmaster {taskmaster.id}</h1>
        <pre>{JSON.stringify(taskmaster, null, 2)}</pre>

        <TaskmasterForm
          submitText="Update Taskmaster"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTaskmaster}
          initialValues={taskmaster}
          onSubmit={async (values) => {
            try {
              const updated = await updateTaskmasterMutation({
                id: taskmaster.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.ShowTaskmasterPage({ taskmasterId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTaskmasterPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTaskmaster />
      </Suspense>

      <p>
        <Link href={Routes.TaskmastersPage()}>
          <a>Taskmasters</a>
        </Link>
      </p>
    </div>
  )
}

EditTaskmasterPage.authenticate = true
EditTaskmasterPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTaskmasterPage
