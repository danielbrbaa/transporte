// Mock API service layer for data management
// This simulates a backend API using localStorage

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

export interface DeliveryHistoryEvent {
  status: DeliveryStatus;
  timestamp: string;
  notes?: string;
}

// Storage keys
const DRIVERS_KEY = 'logistics_drivers';
const ROUTES_KEY = 'logistics_routes';
const DELIVERIES_KEY = 'logistics_deliveries';

// Initialize with mock data
const initializeMockData = () => {
  if (!localStorage.getItem(DRIVERS_KEY)) {
    const mockDrivers: Driver[] = [
      {
        id: '1',
        name: 'João Silva',
        cpf: '123.456.789-00',
        phone: '(11) 98765-4321',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Maria Santos',
        cpf: '987.654.321-00',
        phone: '(11) 91234-5678',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(DRIVERS_KEY, JSON.stringify(mockDrivers));
  }

  if (!localStorage.getItem(ROUTES_KEY)) {
    const mockRoutes: Route[] = [
      {
        id: '1',
        origin: 'São Paulo - SP',
        destination: 'Rio de Janeiro - RJ',
        driverId: '1',
        clientName: 'Empresa ABC Ltda',
        date: new Date().toISOString().split('T')[0],
        value: 1500,
        observations: 'Entrega urgente',
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(ROUTES_KEY, JSON.stringify(mockRoutes));
  }

  if (!localStorage.getItem(DELIVERIES_KEY)) {
    const mockDeliveries: Delivery[] = [
      {
        id: '1',
        routeId: '1',
        driverId: '1',
        status: 'entregue',
        clientName: 'Empresa ABC Ltda',
        address: 'Av. Paulista, 1000 - São Paulo',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        history: [
          {
            status: 'entregue',
            timestamp: new Date().toISOString(),
            notes: 'Entrega realizada com sucesso',
          },
        ],
      },
    ];
    localStorage.setItem(DELIVERIES_KEY, JSON.stringify(mockDeliveries));
  }
};

// Helper functions
const getData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Drivers API
export const driversApi = {
  getAll: (): Driver[] => {
    initializeMockData();
    return getData<Driver>(DRIVERS_KEY);
  },

  getById: (id: string): Driver | undefined => {
    return driversApi.getAll().find(d => d.id === id);
  },

  create: (driver: Omit<Driver, 'id' | 'createdAt'>): Driver => {
    const drivers = driversApi.getAll();
    const newDriver: Driver = {
      ...driver,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    drivers.push(newDriver);
    setData(DRIVERS_KEY, drivers);
    return newDriver;
  },

  update: (id: string, updates: Partial<Driver>): Driver | undefined => {
    const drivers = driversApi.getAll();
    const index = drivers.findIndex(d => d.id === id);
    if (index === -1) return undefined;
    
    drivers[index] = { ...drivers[index], ...updates };
    setData(DRIVERS_KEY, drivers);
    return drivers[index];
  },

  delete: (id: string): boolean => {
    const drivers = driversApi.getAll();
    const filtered = drivers.filter(d => d.id !== id);
    if (filtered.length === drivers.length) return false;
    
    setData(DRIVERS_KEY, filtered);
    return true;
  },
};

// Routes API
export const routesApi = {
  getAll: (): Route[] => {
    initializeMockData();
    return getData<Route>(ROUTES_KEY);
  },

  getById: (id: string): Route | undefined => {
    return routesApi.getAll().find(r => r.id === id);
  },

  create: (route: Omit<Route, 'id' | 'createdAt'>): Route => {
    const routes = routesApi.getAll();
    const newRoute: Route = {
      ...route,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    routes.push(newRoute);
    setData(ROUTES_KEY, routes);
    return newRoute;
  },

  update: (id: string, updates: Partial<Route>): Route | undefined => {
    const routes = routesApi.getAll();
    const index = routes.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    
    routes[index] = { ...routes[index], ...updates };
    setData(ROUTES_KEY, routes);
    return routes[index];
  },

  delete: (id: string): boolean => {
    const routes = routesApi.getAll();
    const filtered = routes.filter(r => r.id !== id);
    if (filtered.length === routes.length) return false;
    
    setData(ROUTES_KEY, filtered);
    return true;
  },
};

// Deliveries API
export const deliveriesApi = {
  getAll: (): Delivery[] => {
    initializeMockData();
    return getData<Delivery>(DELIVERIES_KEY);
  },

  getById: (id: string): Delivery | undefined => {
    return deliveriesApi.getAll().find(d => d.id === id);
  },

  create: (delivery: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt' | 'history'>): Delivery => {
    const deliveries = deliveriesApi.getAll();
    const newDelivery: Delivery = {
      ...delivery,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          status: delivery.status,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    deliveries.push(newDelivery);
    setData(DELIVERIES_KEY, deliveries);
    return newDelivery;
  },

  updateStatus: (id: string, status: DeliveryStatus, notes?: string): Delivery | undefined => {
    const deliveries = deliveriesApi.getAll();
    const index = deliveries.findIndex(d => d.id === id);
    if (index === -1) return undefined;
    
    const historyEvent: DeliveryHistoryEvent = {
      status,
      timestamp: new Date().toISOString(),
      notes,
    };
    
    deliveries[index] = {
      ...deliveries[index],
      status,
      updatedAt: new Date().toISOString(),
      history: [...deliveries[index].history, historyEvent],
    };
    
    setData(DELIVERIES_KEY, deliveries);
    return deliveries[index];
  },

  delete: (id: string): boolean => {
    const deliveries = deliveriesApi.getAll();
    const filtered = deliveries.filter(d => d.id !== id);
    if (filtered.length === deliveries.length) return false;
    
    setData(DELIVERIES_KEY, filtered);
    return true;
  },
};
