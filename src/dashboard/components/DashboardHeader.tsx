import { Menu, Bell } from "lucide-react"

interface Props {
  onOpenSidebar: () => void
}

export const DashboardHeader = ({ onOpenSidebar }: Props) => {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center px-4 lg:px-8">
      <button
        onClick={onOpenSidebar}
        className="lg:hidden text-slate-500 mr-4"
      >
        <Menu />
      </button>

      <h1 className="text-lg font-semibold flex-1">Dashboard</h1>

      <button className="text-slate-500">
        <Bell />
      </button>
    </header>
  )
}
