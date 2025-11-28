import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Users, Route, Package, TrendingUp } from "lucide-react";
import { driversApi, routesApi, deliveriesApi, Delivery } from "@/services/mockApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatusBadge } from "@/components/StatusBadge";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    drivers: 0,
    routes: 0,
    deliveries: 0,
    activeRoutes: 0,
  });

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    const drivers = driversApi.getAll();
    const routes = routesApi.getAll();
    const allDeliveries = deliveriesApi.getAll();

    setMetrics({
      drivers: drivers.length,
      routes: routes.length,
      deliveries: allDeliveries.length,
      activeRoutes: routes.filter(r => r.status === 'active').length,
    });

    setDeliveries(allDeliveries.slice(0, 5));
  }, []);

  const chartData = [
    { month: "Jan", entregas: 45 },
    { month: "Fev", entregas: 52 },
    { month: "Mar", entregas: 48 },
    { month: "Abr", entregas: 61 },
    { month: "Mai", entregas: 55 },
    { month: "Jun", entregas: 67 },
  ];

  const statusCounts = deliveries.reduce((acc, delivery) => {
    acc[delivery.status] = (acc[delivery.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do sistema de gerenciamento</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Motoristas"
          value={metrics.drivers}
          icon={Users}
          description="Motoristas cadastrados"
        />
        <MetricCard
          title="Total de Rotas"
          value={metrics.routes}
          icon={Route}
          description="Rotas no sistema"
        />
        <MetricCard
          title="Total de Entregas"
          value={metrics.deliveries}
          icon={Package}
          description="Entregas registradas"
        />
        <MetricCard
          title="Rotas Ativas"
          value={metrics.activeRoutes}
          icon={TrendingUp}
          description="Em andamento"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Entregas por Mês</CardTitle>
            <CardDescription>Volume de entregas nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entregas" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status das Entregas</CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <StatusBadge status={status as any} />
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              ))}
              {Object.keys(statusCounts).length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhuma entrega registrada</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Atualizações</CardTitle>
          <CardDescription>Status mais recentes das entregas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <p className="font-medium">{delivery.clientName}</p>
                  <p className="text-sm text-muted-foreground">{delivery.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(delivery.updatedAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <StatusBadge status={delivery.status} />
              </div>
            ))}
            {deliveries.length === 0 && (
              <p className="text-muted-foreground text-sm">Nenhuma atualização recente</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
