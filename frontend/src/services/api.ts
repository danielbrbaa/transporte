export interface Driver {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  driverId: string;
  clientName: string;
  date: string;
  value: number;
  observations: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export type DeliveryStatus = 'revertido' | 'evidencia_invalida' | 'contestacao_enviada' | 'nok' | 'entregue';

export interface DeliveryHistoryEvent {
  status: DeliveryStatus;
  timestamp: string;
  notes?: string;
}

export interface Delivery {
  id: string;
  routeId: string;
  driverId: string;
  status: DeliveryStatus;
  clientName: string;
  address: string;
  updatedAt: string;
  createdAt: string;
  history: DeliveryHistoryEvent[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Falha na comunicação com a API local.');
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export const driversApi = {
  getAll: () => request<Driver[]>('/drivers'),
  getById: (id: string) => request<Driver>(`/drivers/${id}`),
  create: (driver: Omit<Driver, 'id' | 'createdAt'>) =>
    request<Driver>('/drivers', { method: 'POST', body: JSON.stringify(driver) }),
  update: (id: string, updates: Partial<Driver>) =>
    request<Driver>(`/drivers/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) => request<void>(`/drivers/${id}`, { method: 'DELETE' }),
};

export const routesApi = {
  getAll: () => request<Route[]>('/routes'),
  getById: (id: string) => request<Route>(`/routes/${id}`),
  create: (route: Omit<Route, 'id' | 'createdAt'>) =>
    request<Route>('/routes', { method: 'POST', body: JSON.stringify(route) }),
  update: (id: string, updates: Partial<Route>) =>
    request<Route>(`/routes/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) => request<void>(`/routes/${id}`, { method: 'DELETE' }),
};

export const deliveriesApi = {
  getAll: () => request<Delivery[]>('/deliveries'),
  getById: (id: string) => request<Delivery>(`/deliveries/${id}`),
  create: (delivery: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt' | 'history'>) =>
    request<Delivery>('/deliveries', { method: 'POST', body: JSON.stringify(delivery) }),
  updateStatus: (id: string, status: DeliveryStatus, notes?: string) =>
    request<Delivery>(`/deliveries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),
  delete: (id: string) => request<void>(`/deliveries/${id}`, { method: 'DELETE' }),
};
