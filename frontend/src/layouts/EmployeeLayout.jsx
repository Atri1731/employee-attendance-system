// import {Outlet} from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// function EmployeeLayout() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar role="employee" />

//       <main className="flex-1">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default EmployeeLayout;


import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-40">
        <h1 className="text-lg font-bold text-blue-600">
          Employee Attendance
        </h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}
        <div className="hidden md:block shrink-0">
          <Sidebar role="employee" />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-64 h-full bg-white shadow-xl">

              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 z-10 p-1 rounded-lg bg-white text-gray-600 hover:bg-gray-100"
              >
                <X size={22} />
              </button>

              <Sidebar role="employee" />

            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default EmployeeLayout;