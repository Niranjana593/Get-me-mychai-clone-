"use client"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Nav = () => {
  const { data: session } = useSession()
  const [showdrop, setshowdrop] = useState(false)
  const route = useRouter()
  if (session) {
    return (
      <div className=" top-0 bg-gray-600 flex justify-between items-center px-6 text-white md:h-16 flex-col md:flex-row">
        <div className="flex gap-2 items-center">
          <span><img width={44} src="/tea.gif" alt="" /></span>
          <div onClick={() => { route.push("/") }} className='cursor-pointer logo font-bold text-3xl'>Get Me a Chai</div>
        </div>
        <div className="flex  justify-between gap-14  items-center">
          {/* <p className="text-xl font-bold">{session.user.name}</p> */}
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <div className="flex relative gap-14 justify-center items-center">
            <button onClick={() => setshowdrop(!showdrop)} onBlur={() => {
              setTimeout(() => {
                setshowdrop(false)
              }, 100);
            }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="w-40 justify-center text-white mx-2  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdown" className={` ${showdrop ? "" : "hidden"} z-10 absolute left-[0px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link onClick={() => signOut("github")} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
            <button onClick={() => signOut("github")} type="button" className="cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Out</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <nav className='sticky top-0 bg-gray-600 flex justify-between items-center px-6 text-white h-16'>
      <div onClick={() => { route.push("/") }} className='cursor-pointer logo font-bold text-3xl'>Get Me a Chai</div>
      {/* <ul className='flex gap-10'>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Support</li>
       </ul> */}
      <div>
        <Link href={"/login"}>
          <button className=' mt-[6px] cursor-pointer text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
