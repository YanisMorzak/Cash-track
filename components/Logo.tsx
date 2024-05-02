import { WalletMinimal } from 'lucide-react'
import React from 'react'

export default function Logo() {
  return (
    <a href="/" className='flex items-center gap-[4px]'>
        <WalletMinimal className='stroke h-11 w-11 stroke-green-500 stroke-[1.5]' />
        <p className='bg-gradient-to-tr from-green-600 to-green-300 bg-clip-text text-3xl font-bold tracking-tighter text-transparent'>CashTrack</p>
    </a>
  )
}

