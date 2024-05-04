import React, { ReactNode } from 'react'

export default function layout({children}: {children: ReactNode}) {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
        {children}
    </div>
  )
}
