import { useRouter } from "next/navigation"

const BudgetItem = ({ budget }) => {
    const router = useRouter()
    const calcProgressBar = () => {
        const calc = (budget.totalSpend / budget.amount) * 100
        return calc.toFixed(2)
    }
    return (
        <div className="p-5 border rounded-lg flex my-4 flex-col cursor-pointer hover:shadow-md" onClick={() => router.push(`/dashboard/expenses/${budget.id}`)}>
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <h2 className="text-3xl p-3 bg-slate-100 rounded-full">{budget?.icon}</h2>
                    <div>
                        <h2 className="text-2xl font-bold">{budget.name}</h2>
                        <h2 className="text-lg text-slate-500">{budget.totalItem} Item</h2>
                    </div>
                </div>
                <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
            </div>
            <div className="flex gap-1 justify-between mt-10 mb-2">
                <h2 className="text-lg  text-slate-300">${budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
                <h2 className="text-lg  text-slate-300">${budget.amount - budget.totalSpend} Remaining</h2>
            </div>
            <div>
                <div className="w-full bg-slate-200 h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${calcProgressBar()}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default BudgetItem