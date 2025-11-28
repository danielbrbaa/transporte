import { Badge } from "@/components/ui/badge";
import { DeliveryStatus } from "@/services/mockApi";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: DeliveryStatus;
}

const statusConfig: Record<DeliveryStatus, { label: string; className: string }> = {
  entregue: {
    label: "Entregue",
    className: "bg-status-delivered text-white hover:bg-status-delivered/90",
  },
  revertido: {
    label: "Revertido",
    className: "bg-status-reverted text-white hover:bg-status-reverted/90",
  },
  evidencia_invalida: {
    label: "Evidência Inválida",
    className: "bg-status-invalid text-white hover:bg-status-invalid/90",
  },
  contestacao_enviada: {
    label: "Contestação Enviada",
    className: "bg-status-contestation text-white hover:bg-status-contestation/90",
  },
  nok: {
    label: "NOK",
    className: "bg-status-nok text-white hover:bg-status-nok/90",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
