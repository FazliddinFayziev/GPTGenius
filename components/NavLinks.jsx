import Link from 'next/link'
import React from 'react'

const links = [
    {href: '/chat', lable: 'chat'},
    {href: '/tours', lable: 'tours'},
    {href: '/tours/new-tour', lable: 'new-tour'},
    {href: '/profile', lable: 'profile'},
]

const NavLinks = () => {
  return (
    <ul className='menu text-base-content'>
      {links.map((link) => {
        return (
            <li key={link.href}>
                <Link href={link.href} className='capitalize'>
                    {link.lable}
                </Link>
            </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
