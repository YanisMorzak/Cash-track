import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  //retrieves the currently logged-in user using the "currentUser()" function
  const user = await currentUser();

  //checks whether the user is authenticated. If not, it redirects the user to the login page.
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>page</div>
  )
}
