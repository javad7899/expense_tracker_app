"use client"

import Image from "next/image"
import Link from "next/link"
import { useUser,UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"

const Header = () => {
    const { isSignedIn } = useUser()
    return (
        <div className="p-5 flex justify-between items-center border-b shadow-sm">
            <Image src="/logo.svg" alt="logo" width={160} height={100} priority={true} className="w-auto h-auto"/>
            {isSignedIn ? <UserButton /> : <Link href="/sign-in"><Button>Get Start</Button></Link>}
        </div>
    )
}

export default Header