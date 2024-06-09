"use client"

import { useUser } from "@clerk/nextjs"
import { db } from "@/utils/dbConfig"
import { Expenses, Budgets } from "@/utils/schema"
import { desc, eq, getTableColumns, sql } from "drizzle-orm"
import { useEffect, useState } from "react"
import CardInfo from "@/components/CardInfo"
import dynamic from 'next/dynamic';
const BarChartDashboard = dynamic(() => import('@/components/BarChartDashboard'), {
    ssr: false
});import BudgetItem from "@/components/BudgetItem"
import ExpensesListTable from "@/components/ExpensesListTable"

const Dashboard = () => {
  const [budgetList, setBugetList] = useState([])
  const [expensesList, setExpensesList] = useState([])

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
    getAllExpenses()
  }

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id))
    setExpensesList(result)
  }
  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl">hi, {user?.fullName}</h2>
      <CardInfo {...{ budgetList }} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
        <div className="md:col-span-2">
          <BarChartDashboard {...{ budgetList }} />
          <ExpensesListTable {...{ expensesList }} refreshData={() => getBudgetList()} />
        </div>
        <div className="md:col-span-1 ml-4">
          <h2 className="font-medium text-lg">Last Budgets</h2>
          {budgetList.map((budget, index) => (<BudgetItem key={index} {...{ budget }} />))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard