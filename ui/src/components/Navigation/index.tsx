'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import classNames from 'classnames';
import { INavigationLink } from './types';
import EmojiText from '@/components/EmojiText';
import { OrdersTitle } from '@/modules/Orders/components/OrdersTitle';
import StockTitle from '@/modules/Products/components/ProductsTitle';
import { PRODUCTS_UI_PATH } from '@/modules/Products/configs';
import { ORDERS_UI_PATH } from '@/modules/Orders/configs';

const links: INavigationLink[] = [
  { title: OrdersTitle, href: ORDERS_UI_PATH },
  { title: StockTitle, href: PRODUCTS_UI_PATH },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname()

  function onOpen() {
    setIsOpen(!isOpen)
  }

  function onLinkClick() {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl whitespace-nowrap dark:text-white"><EmojiText emoji="🍺">Cometa Bar</EmojiText></span>
        </Link>

        <button onClick={onOpen} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={classNames('w-full md:block md:w-auto', { 'hidden': !isOpen })} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  className={classNames('block py-2 px-3 rounded md:p-0 dark:text-white', {
                    'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent': link.href !== pathname,
                    'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500 pointer-events-none': link.href === pathname,

                  })}
                  href={link.href}
                  aria-current="page"
                  onClick={onLinkClick}
                >
                  {link.title()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
};
