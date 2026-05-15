import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, LogOut, Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/70 bg-card/95 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h1 className="text-base font-semibold text-foreground md:text-lg">Painel Operacional WLS Cargo</h1>
                <p className="hidden text-xs text-muted-foreground md:block">Gestão local de rotas, motoristas e entregas</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 bg-background" placeholder="Buscar no painel..." />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Ambiente local
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
