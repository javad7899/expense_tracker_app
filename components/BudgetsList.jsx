"use client"

import CreateBudget from "./CreateBudget"
import { db } from "@/utils/dbConfig"
import { Expenses, Budgets } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { desc, eq, getTableColumns, sql } from "drizzle-orm"
import { useEffect, useState } from "react"
import BudgetItem from "./BudgetItem"
import { Skeleton } from "@/components/ui/skeleton"

const BudgetsList = () => {
    const [budgetList, setBugetList] = useState([])

    const { user } = useUser()

    useEffect(() => {
        user && getBudgetList()
    }, [user])

    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id))
        setBugetList(result)
    }
    return (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <CreateBudget refreshData={() => getBudgetList()} />
            {budgetList.length > 0 ? budgetList.map((budget, index) => (
                <BudgetItem {...{ budget }} key={index} />
            )) : [1,2,3,4,5].map((_, index) => <Skeleton className="h-40 rounded-md bg-slate-200" key={index} />)}
        </div>
    )
}

export default BudgetsList