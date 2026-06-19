
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSideBar from "@/components/dashboard/DashboardSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* sidebar */}
        <div  className="border-0 md:border md:border-right-1">
          <DashboardSideBar />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* navbar */}
          <DashboardNavbar />
          <main className="p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}