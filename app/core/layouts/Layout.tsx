import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Navbar from "../components/Navbar"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-saas"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <div className="main-content"> {children}</div>
      </Suspense>
    </>
  )
}

export default Layout
