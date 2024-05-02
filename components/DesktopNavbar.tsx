import React from 'react'
import Logo from './Logo'
import { items } from '@/enums/itemsNav'
import { Label } from '@/components/ui/label';

export default function DesktopNavbar() {
  return (
    <div className='hidden border-separate border-b bg-background md:block'>
        <nav className="container flex items-center justify-between px-8">
            <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                <Logo />
                <div className="flex h-full">
                    {items.map((item) => {
                        return <NavbarItem key={item.label} link={item.link} Label={item.label}/>
                    })}
                </div>
            </div>
        </nav>
    </div>
  )
}
