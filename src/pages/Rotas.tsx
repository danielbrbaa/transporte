import { useEffect, useState } from "react";
import { routesApi, driversApi, Route, Driver } from "@/services/mockApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Rotas() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    driverId: "",
    clientName: "",
    date: "",
    value: 0,
    observations: "",
    status: "active" as "active" | "completed" | "cancelled",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRoutes(routesApi.getAll());
    setDrivers(driversApi.getAll());
  };

  const handleOpenDialog = (route?: Route) => {
    if (route) {
      setEditingRoute(route);
      setFormData({
        origin: route.origin,
        destination: route.destination,
        driverId: route.driverId,
        clientName: route.clientName,
        date: route.date,
        value: route.value,
        observations: route.observations,
        status: route.status,
      });
    } else {
      setEditingRoute(null);
      setFormData({
        origin: "",
        destination: "",
        driverId: "",
        clientName: "",
        date: new Date().toISOString().split("T")[0],
        value: 0,
        observations: "",
        status: "active",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRoute) {
      routesApi.update(editingRoute.id, formData);
      toast({
        title: "Rota atualizada",
        description: "As informações da rota foram atualizadas com sucesso.",
      });
    } else {
      routesApi.create(formData);
      toast({
        title: "Rota criada",
        description: "Nova rota adicionada ao sistema.",
      });
    }

    loadData();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir esta rota?")) {
      routesApi.delete(id);
      loadData();
      toast({
        title: "Rota excluída",
        description: "A rota foi removida do sistema.",
        variant: "destructive",
      });
    }
  };

  const getDriverName = (driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    return driver?.name || "Não atribuído";
  };

  const statusColors = {
    active: "default",
    completed: "secondary",
    cancelled: "destructive",
  } as const;

  const statusLabels = {
    active: "Ativa",
    completed: "Concluída",
    cancelled: "Cancelada",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rotas</h2>
          <p className="text-muted-foreground">Gerencie as rotas de entrega</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Rota
        </Button>
      </div>

      <div className="grid gap-4">
        {routes.map((route) => (
          <Card key={route.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {route.origin} → {route.destination}
                  </CardTitle>
                  <CardDescription>Cliente: {route.clientName}</CardDescription>
                </div>
                <Badge variant={statusColors[route.status]}>
                  {statusLabels[route.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Motorista:</span> {getDriverName(route.driverId)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Data:</span>{" "}
                    {new Date(route.date).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Valor:</span>{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(route.value)}
                  </p>
                </div>
                {route.observations && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Observações:</p>
                    <p className="text-sm text-muted-foreground">{route.observations}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenDialog(route)}
                  className="flex-1"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(route.id)}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {routes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhuma rota cadastrada</p>
            <Button className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Primeira Rota
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRoute ? "Editar Rota" : "Nova Rota"}</DialogTitle>
            <DialogDescription>
              {editingRoute ? "Atualize as informações da rota" : "Preencha os dados para criar uma nova rota"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="origin">Origem</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="destination">Destino</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Cliente</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="driverId">Motorista</Label>
                  <Select
                    value={formData.driverId}
                    onValueChange={(value) => setFormData({ ...formData, driverId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um motorista" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Valor (R$)</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="completed">Concluída</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{editingRoute ? "Atualizar" : "Criar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
