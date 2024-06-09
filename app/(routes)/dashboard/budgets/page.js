import BudgetsList from "@/components/BudgetsList"


const Budgets = () => {

    return (
        <div className='p-5'>
            <h2 className="font-bold text-3xl">My Budgets</h2>
            <BudgetsList />
        </div>
    )
}

export default Budgets