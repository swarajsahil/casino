import * as React from "react"
import {
  IconDashboard,
  IconArticle,
  IconPlayCard,
  IconDeviceGamepad2,
  IconStar,
  IconCards,
  IconPhotoPlus
} from "@tabler/icons-react"

import { NavMain } from "../Components/nav-main"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Link} from "react-router-dom"
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: IconArticle,
    },
    {
      title: "Live Casino",
      url: "/admin/casino",
      icon: IconPlayCard,
    },
    {
      title: "Free Games",
      url: "/admin/games",
      icon: IconDeviceGamepad2,
    },
    {
      title: "Popup",
      url: "/admin/popup",
      icon: IconPhotoPlus,
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: IconStar,
    },
  ],
  
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link to="/admin">
                <IconCards size={32} stroke={2} />
                <span className="text-base font-semibold">Casino Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
