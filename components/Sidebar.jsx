
import { LayoutGrid, PiggyBank } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Sidebar = () => {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
  ]

  const pathname = usePathname()

  return (
    <div className="h-screen p-5 border-r shadow-sm">
      <div className="flex flex-col gap-4 h-full pt-10">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 rounded-md cursor-pointer hover:text-primary hover:bg-blue-100 transition-all ${pathname === menu.path && "bg-primary text-white"}`}><menu.icon />{menu.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar