import { useEffect, useState } from "react";
import { driversApi, Driver } from "@/services/mockApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

export default function Motoristas() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    setDrivers(driversApi.getAll());
  };

  const handleOpenDialog = (driver?: Driver) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData({
        name: driver.name,
        cpf: driver.cpf,
        phone: driver.phone,
        status: driver.status,
      });
    } else {
      setEditingDriver(null);
      setFormData({
        name: "",
        cpf: "",
        phone: "",
        status: "active",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDriver) {
      driversApi.update(editingDriver.id, formData);
      toast({
        title: "Motorista atualizado",
        description: "As informações do motorista foram atualizadas com sucesso.",
      });
    } else {
      driversApi.create(formData);
      toast({
        title: "Motorista cadastrado",
        description: "Novo motorista adicionado ao sistema.",
      });
    }

    loadDrivers();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Deseja realmente excluir este motorista?")) {
      driversApi.delete(id);
      loadDrivers();
      toast({
        title: "Motorista excluído",
        description: "O motorista foi removido do sistema.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Motoristas</h2>
          <p className="text-muted-foreground">Gerencie os motoristas cadastrados no sistema</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Motorista
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <Card key={driver.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{driver.name}</CardTitle>
                  <CardDescription>CPF: {driver.cpf}</CardDescription>
                </div>
                <Badge variant={driver.status === "active" ? "default" : "secondary"}>
                  {driver.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Telefone:</span> {driver.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Cadastrado em:</span>{" "}
                  {new Date(driver.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenDialog(driver)}
                  className="flex-1"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(driver.id)}
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

      {drivers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum motorista cadastrado</p>
            <Button className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Primeiro Motorista
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDriver ? "Editar Motorista" : "Novo Motorista"}
            </DialogTitle>
            <DialogDescription>
              {editingDriver
                ? "Atualize as informações do motorista"
                : "Preencha os dados para cadastrar um novo motorista"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingDriver ? "Atualizar" : "Cadastrar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
