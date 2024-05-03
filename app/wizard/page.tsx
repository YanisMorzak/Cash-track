import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    const user = await currentUser()

    // if the user is not defined we are going to redirect him to sign in page
    if (!user) {
        redirect("/sign-in")
    }
  return (
    <div>page</div>
  )
}
