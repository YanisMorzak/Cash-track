import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function NavbarItem({link, label}: {
    link: string;
    label: string;
}) {
    const pathname = usePathname()
    const isActive = pathname === link
  return (
    <div className='relative flex items-center'>
        <Link href={link}>{label}</Link>
    </div>
  )
}
