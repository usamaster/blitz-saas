import Link from "next/link"
import React from "react"

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="links">
        <Link href="/">Home</Link>

        <Link href="/questions">Questions</Link>
        <Link href="/tasks">Taskmaster</Link>
      </div>
    </div>
  )
}

export default Navbar
