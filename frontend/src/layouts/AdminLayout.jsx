import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-blue-100 flex overflow-x-hidden">
      <Sidebar role="admin" />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
