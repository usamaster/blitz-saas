import { useRouter } from "next/router"

const car = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { id } = router.query

  return <div>index {id}</div>
}

export default car
