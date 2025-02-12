"use client"

import { signIn } from "next-auth/react"

export function Appbar() {
  return (
    <div className="flex justify-between mx-3">
        <div className="self-center"> Muzi </div>
        <div> 
            <button className=" m-2 p-2 bg-blue-400 rounded-lg" onClick={()=>{
                signIn()
            }}>Signin</button>
        </div>
    </div>
  )
}

