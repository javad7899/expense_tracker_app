"use client"

import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

const Hero = () => {
    const { isSignedIn } = useUser()
    return (<section className="bg-gray-50 flex flex-col items-center my-10 gap-6">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
            <div className="mx-auto max-w-xl text-center">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    Manager Your Expense<strong className="mt-2 font-extrabold text-primary sm:block">Control Your Money</strong>
                </h1>
                <p className="mt-6 sm:text-xl/relaxed">Start creating Your budget and save ton of money</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        className=" border-primary border block w-full rounded bg-primtext-primary px-12 py-3 text-sm font-medium text-primary shadow-sm hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring sm:w-auto"
                        href={isSignedIn ? "/dashboard" : "/sign-in"}
                    >
                        {isSignedIn ? "Go to the Dashboard" : "Get Start"}
                    </Link>
                </div>
            </div>
        </div>
        <Image src="/dashboard.png" alt="dashboard" width={1000} height={700} className="mt-5 rounded-xl border-2" />
    </section>)
}

export default Hero