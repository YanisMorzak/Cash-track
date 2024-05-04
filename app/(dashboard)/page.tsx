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

   // uses Prisma to search the database for user parameters.
   const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  // If no user parameters are found, this means that the user has not yet configured his parameters, so redirect the user to an initial configuration page.
  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>
        </div>
      </div>
    </div>
  )
}
