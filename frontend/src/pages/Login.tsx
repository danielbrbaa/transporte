import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");

  if (isAuthenticated) return <Navigate to="/" replace />;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const success = login(username, password);
    if (!success) {
      toast({ title: "Acesso negado", description: "Use admin / 123456 para a apresentação local.", variant: "destructive" });
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_36%),linear-gradient(135deg,hsl(var(--sidebar-background)),hsl(217_48%_9%))] flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-white/10 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Truck className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-2xl">WLS Cargo Manager</CardTitle>
            <CardDescription>Painel local de gestão operacional</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuário</Label>
              <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <Button type="submit" className="w-full">Acessar painel</Button>
          </form>
          <div className="mt-5 flex items-start gap-2 rounded-xl border bg-muted/40 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
            <p>Credenciais de demonstração: <strong>admin</strong> / <strong>123456</strong>. O login é local e não exige internet.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
