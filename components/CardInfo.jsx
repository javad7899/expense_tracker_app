"use client"

import { ReceiptText, Wallet, PiggyBank } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

const CardInfo = ({ budgetList }) => {
    const [totalBudget, setTotalBudget] = useState(0)
    const [totalSpend, setTotalSpend] = useState(0)
    useEffect(() => { budgetList && calculateCardInfo() }, [budgetList])
    const calculateCardInfo = () => {
        let totalBudget_ = 0
        let totalSpend_ = 0
        budgetList.forEach((element) => {
            totalBudget_ = totalBudget_ + Number(element.amount)
            totalSpend_ = totalSpend_ + Number(element.totalSpend)
        })
        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)
    }
    return (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {budgetList?.length > 0 ? <>
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2>Total Budget</h2>
                        <h2 className="font-bold text-xl">${totalBudget}</h2>
                    </div>
                    <PiggyBank className="bg-primary p-3 w-12 h-12 rounded-full text-white" />
                </div>
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2>Total Spend</h2>
                        <h2 className="font-bold text-xl">${totalSpend}</h2>
                    </div>
                    <ReceiptText className="bg-primary p-3 w-12 h-12 rounded-full text-white" />
                </div>
                <div className="p-7 border rounded-lg flex items-center justify-between">
                    <div>
                        <h2>No. of Budget</h2>
                        <h2 className="font-bold text-xl">{budgetList?.length}</h2>
                    </div>
                    <Wallet className="bg-primary p-3 w-12 h-12 rounded-full text-white" />
                </div>
            </> : [1, 2, 3].map((_, index) => <Skeleton className="h-40 rounded-md bg-slate-200" key={index} />)}
        </div>
    )
}

export default CardInfo