"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { db } from "@/utils/dbConfig"
import { Budgets, Expenses } from "@/utils/schema"
import { toast } from "sonner"

const AddExpense = ({ budgetId, refreshData }) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")

    const onAddExpense = async () => {
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        }).returning({ insertedId: Budgets.id })
        setName("");
        setAmount("")
        if (result) {
            refreshData()
            toast("New Expense Added!")
        }
    }
    return (
        <div>
            <h2 className="font-bold text-xl">Add Expense</h2>
            <div className="mt-5">
                <h2 className="my-2 font-medium">Expense Name</h2>
                <Input placaholder="e.g. Home Decor" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="mt-5">
                <h2 className="my-2 font-medium">Expense Amount</h2>
                <Input placaholder="e.g. 2000$" onChange={(e) => setAmount(e.target.value)} value={amount} />
            </div>
            <Button disabled={!(name && amount)} onClick={() => onAddExpense()} className="w-full mt-5">Add New Expense</Button>
        </div>
    )
}

export default AddExpense