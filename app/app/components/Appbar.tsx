"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar() {
    const session = useSession();
    return (
        <div className="flex justify-between mx-3">
            <div className="self-center"> Muzi </div>
            <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-400 rounded-lg" onClick={() => signOut()}>Logout</button>}
                {!session.data?.user &&<button className=" m-2 p-2 bg-blue-400 rounded-lg" onClick={() => {signIn()}}>Signin</button>}
            </div>
        </div>
    )
}

