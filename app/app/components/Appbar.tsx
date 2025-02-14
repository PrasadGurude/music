"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Music } from "lucide-react"

export function Appbar() {
    const session = useSession();
    return (
        <header className=" mx-2 px-2 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-purple-500" />
            <span className="text-2xl font-bold">FanTune</span>
          </div>
          <nav>
            <ul className="flex space-x-4 items-center ">
              <li>
                <Link href="#features" className="hover:text-purple-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 ">
                  About
                </Link>
              </li>
              <li>
              <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-400 rounded-lg" onClick={() => signOut()}>Logout</button>}
                {!session.data?.user &&<button className=" m-2 p-2 bg-blue-400 rounded-lg" onClick={() => {signIn()}}>Signin</button>}
            </div>
              </li>
            </ul>
          </nav>
        </header>
    )
}
<div className="flex justify-between mx-3">
            <div className="self-center"> Muzi </div>
            
        </div>
