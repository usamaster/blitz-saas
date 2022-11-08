import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="main-content">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </div>
  )
}

export default SignupPage
