import { useEffect, useState } from "react";
import { deliveriesApi, driversApi, routesApi, Delivery, DeliveryStatus, Driver, Route } from "@/services/mockApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, RefreshCw, History, Package } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Entregas() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    routeId: "",
    driverId: "",
    status: "entregue" as DeliveryStatus,
    clientName: "",
    address: "",
  });

  const [statusFormData, setStatusFormData] = useState({
    status: "entregue" as DeliveryStatus,
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDeliveries(deliveriesApi.getAll());
    setDrivers(driversApi.getAll());
    setRoutes(routesApi.getAll());
  };

  const handleOpenDialog = () => {
    setFormData({
      routeId: "",
      driverId: "",
      status: "entregue",
      clientName: "",
      address: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenStatusDialog = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setStatusFormData({
      status: delivery.status,
      notes: "",
    });
    setIsStatusDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deliveriesApi.create(formData);
    toast({
      title: "Entrega criada",
      description: "Nova entrega registrada no sistema.",
    });
    loadData();
    setIsDialogOpen(false);
  };

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelivery) return;

    deliveriesApi.updateStatus(selectedDelivery.id, statusFormData.status, statusFormData.notes);
    toast({
      title: "Status atualizado",
      description: "O status da entrega foi atualizado com sucesso.",
    });
    loadData();
    setIsStatusDialogOpen(false);
  };

  const getDriverName = (driverId: string) => {
    return drivers.find((d) => d.id === driverId)?.name || "Não atribuído";
  };

  const getRouteName = (routeId: string) => {
    const route = routes.find((r) => r.id === routeId);
    return route ? `${route.origin} → ${route.destination}` : "Não atribuída";
  };

  const filterByStatus = (status?: DeliveryStatus) => {
    if (!status) return deliveries;
    return deliveries.filter((d) => d.status === status);
  };

  const DeliveryCard = ({ delivery }: { delivery: Delivery }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{delivery.clientName}</CardTitle>
            <CardDescription>{delivery.address}</CardDescription>
          </div>
          <StatusBadge status={delivery.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <p className="text-sm">
            <span className="font-medium">Rota:</span> {getRouteName(delivery.routeId)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Motorista:</span> {getDriverName(delivery.driverId)}
          </p>
          <p className="text-sm text-muted-foreground">
            Atualizado em: {new Date(delivery.updatedAt).toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleOpenStatusDialog(delivery)} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Status
          </Button>
        </div>
        {delivery.history.length > 1 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <History className="h-4 w-4" />
              Histórico
            </p>
            <div className="space-y-2">
              {delivery.history.slice(-3).reverse().map((event, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  <StatusBadge status={event.status} /> -{" "}
                  {new Date(event.timestamp).toLocaleString("pt-BR")}
                  {event.notes && <p className="mt-1 ml-4">{event.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Entregas</h2>
          <p className="text-muted-foreground">Gerencie e acompanhe as entregas</p>
        </div>
        <Button onClick={handleOpenDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Entrega
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas ({deliveries.length})</TabsTrigger>
          <TabsTrigger value="entregue">Entregue ({filterByStatus("entregue").length})</TabsTrigger>
          <TabsTrigger value="revertido">Revertido ({filterByStatus("revertido").length})</TabsTrigger>
          <TabsTrigger value="evidencia_invalida">
            Evidência Inválida ({filterByStatus("evidencia_invalida").length})
          </TabsTrigger>
          <TabsTrigger value="contestacao_enviada">
            Contestação Enviada ({filterByStatus("contestacao_enviada").length})
          </TabsTrigger>
          <TabsTrigger value="nok">NOK ({filterByStatus("nok").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid gap-4 md:grid-cols-2">
          {deliveries.map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}
          {deliveries.length === 0 && (
            <Card className="col-span-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma entrega registrada</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {(["entregue", "revertido", "evidencia_invalida", "contestacao_enviada", "nok"] as DeliveryStatus[]).map(
          (status) => (
            <TabsContent key={status} value={status} className="grid gap-4 md:grid-cols-2">
              {filterByStatus(status).map((delivery) => (
                <DeliveryCard key={delivery.id} delivery={delivery} />
              ))}
            </TabsContent>
          )
        )}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Entrega</DialogTitle>
            <DialogDescription>Registre uma nova entrega no sistema</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="routeId">Rota</Label>
                <Select value={formData.routeId} onValueChange={(value) => setFormData({ ...formData, routeId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma rota" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.id}>
                        {route.origin} → {route.destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="grid gap-2">
                <Label htmlFor="status">Status Inicial</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="revertido">Revertido</SelectItem>
                    <SelectItem value="evidencia_invalida">Evidência Inválida</SelectItem>
                    <SelectItem value="contestacao_enviada">Contestação Enviada</SelectItem>
                    <SelectItem value="nok">NOK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status</DialogTitle>
            <DialogDescription>Altere o status da entrega e adicione observações</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStatusUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="newStatus">Novo Status</Label>
                <Select
                  value={statusFormData.status}
                  onValueChange={(value: any) => setStatusFormData({ ...statusFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="revertido">Revertido</SelectItem>
                    <SelectItem value="evidencia_invalida">Evidência Inválida</SelectItem>
                    <SelectItem value="contestacao_enviada">Contestação Enviada</SelectItem>
                    <SelectItem value="nok">NOK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={statusFormData.notes}
                  onChange={(e) => setStatusFormData({ ...statusFormData, notes: e.target.value })}
                  rows={3}
                  placeholder="Adicione detalhes sobre a atualização (opcional)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Atualizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
