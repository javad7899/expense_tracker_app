import { db } from "@/utils/dbConfig"
import { Expenses } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

const ExpensesListTable = ({ expensesList, refreshData }) => {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id, expense.id))
        if (result) {
            refreshData()
            toast("Expense Deleted!")
        }
    }

    return (
        <div className="mt-3">
          <h2 className="font-medium text-lg my-2">Last Expenses</h2>
            <div className="grid grid-cols-4 bg-slate-200 p-2 border-b border-slate-300">
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {expensesList.map((expense, index) => (
                <div className="grid grid-cols-4 bg-slate-100 p-2" key={index}>
                    <h2>{expense.name}</h2>
                    <h2>{expense.amount}</h2>
                    <h2>{expense.createdAt}</h2>
                    <h2>
                        <Trash2 className="text-red-600 cursor-pointer" onClick={() => deleteExpense(expense)} />
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default ExpensesListTable