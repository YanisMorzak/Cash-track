import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  //retrieves the currently logged-in user using the "currentUser()" function
  const user = await currentUser();

  return (
    <div>page</div>
  )
}
