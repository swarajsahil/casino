import { Separator } from "../components/ui/separator"
import { SidebarTrigger } from "../components/ui/sidebar"
import { useLocation } from "react-router-dom"

export function SiteHeader() {
  const location = useLocation();
  const path = location.pathname; // e.g., "/blogs"
  
  const data = [
    { title: "Add Blog" ,url: "/admin/blog/add-blog" },
    { title: "Add Casino",url: "/admin/casino/add-casino" },
    { title: "Add Game" ,url: "/admin/games/add-games"},
    { title: "Dashboard", url: "/admin" },
    { title: "Blog", url: "/admin/blog" },
    { title: "Live Casino", url: "/admin/casino" },
    { title: "Free Games", url: "/admin/games" },
    { title: "Reviews", url: "/admin/reviews" },
  ];

  // Find title based on path
  const current = data.find((item) => item.url === path);
  const title = current?.title || "Unknown Page";

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="w-1/50 flex justify-start items-center">
          <SidebarTrigger className="-ml-1" />
        </div>
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="w-9/10 flex justify-center items-center">
          <h1 className="text-xl font-medium ">{title}</h1>
        </div>
      </div>
    </header>
  );
}