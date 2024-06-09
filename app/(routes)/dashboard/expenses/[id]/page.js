"use client"

import AddExpense from "@/components/AddExpense"
import BudgetItem from "@/components/BudgetItem"
import ExpensesListTable from "@/components/ExpensesListTable"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/utils/dbConfig"
import { Expenses, Budgets } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { desc, eq, getTableColumns, sql } from "drizzle-orm"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import EditBudget from "@/components/EditBudget"

const SingleExpense = ({ params }) => {

    const [budgetInfo, setBugetInfo] = useState()
    const [expensesList, setExpensesList] = useState([])

    const { user } = useUser()
    const router = useRouter()
    useEffect(() => {
        user && getBudgetInfo()
    }, [params])

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)
        setBugetInfo(result[0]);
        getExpenseList()
    }
    const getExpenseList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id))
        setExpensesList(result)
    }

    const deleteBudget = async () => {
        try {
            await db.delete(Expenses).where(eq(Expenses.budgetId, params.id));
            await db.delete(Budgets).where(eq(Budgets.id, params.id)).returning();
            router.replace("/dashboard/budgets");
            toast("Budget Deleted!");
        } catch (error) {
            console.error("Failed to delete budget and expenses:", error);
            toast.error("Failed to delete budget. Please try again.");
        }
    };

    return (
        <div className='p-5'>
            <div className="flex w-full items-center justify-between">
                <h2 className="text-2xl font-bold">My Expenses</h2>
                <div className="flex gap-3">
                    <EditBudget {...{ budgetInfo}} refreshData={() => getBudgetInfo()} />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="bg-red-600 hover:bg-red-700"> <Trash2 className="mr-2" /> Delete Budget</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    budget and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => deleteBudget()}>Yes</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>


            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetInfo ? <BudgetItem budget={budgetInfo} /> : <Skeleton className="h-40 rounded-md bg-slate-200" />}
                <AddExpense budgetId={params.id} refreshData={() => getBudgetInfo()} />
            </div>
            <div className="mt-5">
                <h2 className="text-xl font-medium">Latest Expenses</h2>
                <ExpensesListTable {...{ expensesList }} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default SingleExpense
