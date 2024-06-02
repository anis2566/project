import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex relative">
      <div className="hidden md:block fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl">
        <div className="fixed top-0 left-0 h-full w-[220px]">
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col flex-1 max-w-screen-2xl mx-auto">
        <Navbar />
        <main className="flex flex-1 flex-col pt-4 pl-4 md:ml-[220px]">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;