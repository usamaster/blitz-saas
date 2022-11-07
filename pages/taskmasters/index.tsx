import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getTaskmasters from "app/taskmasters/queries/getTaskmasters"

const ITEMS_PER_PAGE = 100

export const TaskmastersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ taskmasters, hasMore }] = usePaginatedQuery(getTaskmasters, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {taskmasters.map((taskmaster) => (
          <li key={taskmaster.id}>
            <Link href={Routes.ShowTaskmasterPage({ taskmasterId: taskmaster.id })}>
              <a>{taskmaster.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TaskmastersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Taskmasters</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTaskmasterPage()}>
            <a>Create Taskmaster</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TaskmastersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TaskmastersPage
