import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createTask from "app/tasks/mutations/createTask"
import { TaskForm, FORM_ERROR } from "app/tasks/components/TaskForm"

const NewTaskPage = () => {
  const router = useRouter()
  const [createTaskMutation] = useMutation(createTask)

  return (
    <Layout title={"Create New Task"}>
      <h1>Create New Task</h1>

      <TaskForm
        submitText="Create Task"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTask}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const task = await createTaskMutation(values)
            await router.push(Routes.ShowTaskPage({ taskId: task.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TasksPage()}>
          <a>Tasks</a>
        </Link>
      </p>
    </Layout>
  )
}

NewTaskPage.authenticate = true

export default NewTaskPage
