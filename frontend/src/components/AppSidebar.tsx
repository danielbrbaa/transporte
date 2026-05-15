import { LayoutDashboard, Users, Route, Package, FileText, Truck } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Motoristas", url: "/motoristas", icon: Users },
  { title: "Rotas", url: "/rotas", icon: Route },
  { title: "Entregas", url: "/entregas", icon: Package },
  { title: "Documentação", url: "/documentacao", icon: FileText },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-md">
            <Truck className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <span className="block text-base font-bold text-sidebar-foreground">WLS Cargo</span>
            <span className="text-xs text-sidebar-foreground/60">Gestão de Transportes</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-sidebar-accent p-3 text-xs text-sidebar-foreground/75">
          <p className="font-semibold text-sidebar-foreground">WLS Cargo TMS</p>
          <p>🟢 Operação Online</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
