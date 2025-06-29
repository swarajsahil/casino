import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Sidebar from './admin/components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Blog from '../pages/Blog';
import Casino from '../pages/Casino';
import Games from '../pages/Games';
import Review from '../pages/Reviews';
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from '../pages/Popup';

// import { ChartAreaInteractive } from "../Components/chart-area-interactive";
// import { SectionCards } from "../Components/section-cards";
import { SiteHeader } from "../Components/site-header";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";


// Wrap layout and nested components in a single route element
// function DashboardPage() {
//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="@container/main flex flex-1 flex-col gap-2">
//         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//           <SectionCards />
//           <div className="px-4 lg:px-6">
//             <ChartAreaInteractive />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


function AdminHome() {
  return (
    <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<DashboardPage />} /> */}
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/casino/*" element={<Casino />} />
          <Route path="/games/*" element={<Games />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/popup/*" element={<Popup/>} />
        </Routes>
        </div>
      </div>
    </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminHome;