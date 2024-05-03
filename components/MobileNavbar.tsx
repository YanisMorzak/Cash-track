import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Logo from './Logo'
import { items } from '@/enums/itemsNav'
import NavbarItem from './NavbarItem'
import { ThemeSwitcherBtn } from './ThemeSwitcherBtn'
import { UserButton } from '@clerk/nextjs'

export default function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className=' block border-separate bg-background md:hidden'>
        <nav className='container flex items-center justify-between px-8'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[370px] sm:w-[540px]' side="left">
                    <Logo />
                    <div className="flex flex-col gap-1 pt-4">
                        {items.map((item) => {
                            return <NavbarItem key={item.label} link={item.link} label={item.label} onClick={() => setIsOpen((prev) => !prev)}/>
                        })}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                <Logo showIcon={false} />
            </div>
            <div className="flex items-center gap-2">
                <ThemeSwitcherBtn />
                <UserButton afterSignOutUrl='/sign-in'/>
            </div>
        </nav>
    </div>
  )
}
