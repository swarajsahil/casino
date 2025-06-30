import { IconLogout } from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { useNavigate } from "react-router-dom";



export function NavUser() {
  const API_URL=import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      // Clear token from local storage
      localStorage.removeItem("authToken");

      // Redirect to login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" onClick={()=>{
               if (window.confirm("Are you sure you want to Logout?")) {
              handleLogout();
            }}}>
              <IconLogout />
                Log out
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}