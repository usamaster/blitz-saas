import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createTaskmaster from "app/taskmasters/mutations/createTaskmaster"
import { TaskmasterForm, FORM_ERROR } from "app/taskmasters/components/TaskmasterForm"

const NewTaskmasterPage = () => {
  const router = useRouter()
  const [createTaskmasterMutation] = useMutation(createTaskmaster)

  return (
    <Layout title={"Create New Taskmaster"}>
      <h1>Create New Taskmaster</h1>

      <TaskmasterForm
        submitText="Create Taskmaster"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTaskmaster}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const taskmaster = await createTaskmasterMutation(values)
            await router.push(Routes.ShowTaskmasterPage({ taskmasterId: taskmaster.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TaskmastersPage()}>
          <a>Taskmasters</a>
        </Link>
      </p>
    </Layout>
  )
}

NewTaskmasterPage.authenticate = true

export default NewTaskmasterPage
