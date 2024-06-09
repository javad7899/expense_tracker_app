"use client"

import Sidebar from "@/components/Sidebar";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootesLayout({ children }) {

    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        user && checkUserBudgets()
    }, [user])

    const checkUserBudgets = async () => {
        const result = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        if (result?.length === 0) router.replace("/dashboard/budgets")
    }
    return (
        <div>
            <div className="fixed md:w-64 hidden md:block"><Sidebar /></div>
            <div className="md:ml-64">{children}</div>
        </div>
    )
}