import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 3333);

/**
 * CORS LIBERADO PARA AMBIENTE LOCAL
 */
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

/**
 * SCHEMAS
 */

const driverSchema = z.object({
  name: z.string().min(2),
  cpf: z.string().min(11),
  phone: z.string().min(8),
  status: z.enum(['active', 'inactive']).default('active'),
});

const routeSchema = z.object({
  origin: z.string().min(2),
  destination: z.string().min(2),
  driverId: z.string().min(1),
  clientName: z.string().min(2),
  date: z.string().min(1),
  value: z.coerce.number().default(0),
  observations: z.string().optional().default(''),
  status: z.enum(['active', 'completed', 'cancelled']).default('active'),
});

const deliverySchema = z.object({
  routeId: z.string().min(1),
  driverId: z.string().min(1),
  status: z.enum([
    'revertido',
    'evidencia_invalida',
    'contestacao_enviada',
    'nok',
    'entregue',
  ]),
  clientName: z.string().min(2),
  address: z.string().min(2),
});

/**
 * SERIALIZERS
 */

function serializeRoute(route: any) {
  return {
    ...route,
    date: route.date.toISOString().slice(0, 10),
  };
}

function serializeDelivery(delivery: any) {
  return {
    ...delivery,
    history:
      delivery.history?.map((event: any) => ({
        status: event.status,
        timestamp: event.timestamp.toISOString(),
        notes: event.notes ?? undefined,
      })) ?? [],
  };
}

/**
 * HEALTH
 */

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    name: 'WLS Cargo API Local',
    docs: 'Use /health, /drivers, /routes, /deliveries ou /dashboard/summary',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    api: 'WLS Cargo API Local',
    status: 'online',
  });
});

/**
 * DRIVERS
 */

app.get('/drivers', async (_req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(drivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erro ao buscar motoristas.',
    });
  }
});

app.get('/drivers/:id', async (req, res) => {
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: req.params.id },
    });

    if (!driver) {
      return res.status(404).json({
        message: 'Motorista não encontrado.',
      });
    }

    return res.json(driver);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar motorista.',
    });
  }
});

app.post('/drivers', async (req, res) => {
  try {
    const data = driverSchema.parse(req.body);

    const driver = await prisma.driver.create({
      data,
    });

    return res.status(201).json(driver);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao criar motorista.',
    });
  }
});

app.put('/drivers/:id', async (req, res) => {
  try {
    const data = driverSchema.partial().parse(req.body);

    const driver = await prisma.driver.update({
      where: { id: req.params.id },
      data,
    });

    return res.json(driver);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao atualizar motorista.',
    });
  }
});

app.delete('/drivers/:id', async (req, res) => {
  try {
    await prisma.driver.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao excluir motorista.',
    });
  }
});

/**
 * ROUTES
 */

app.get('/routes', async (_req, res) => {
  try {
    const routes = await prisma.route.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(routes.map(serializeRoute));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar rotas.',
    });
  }
});

app.get('/routes/:id', async (req, res) => {
  try {
    const route = await prisma.route.findUnique({
      where: { id: req.params.id },
    });

    if (!route) {
      return res.status(404).json({
        message: 'Rota não encontrada.',
      });
    }

    return res.json(serializeRoute(route));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar rota.',
    });
  }
});

app.post('/routes', async (req, res) => {
  try {
    const data = routeSchema.parse(req.body);

    const route = await prisma.route.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    return res.status(201).json(serializeRoute(route));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao criar rota.',
    });
  }
});

app.put('/routes/:id', async (req, res) => {
  try {
    const data = routeSchema.partial().parse(req.body);

    const route = await prisma.route.update({
      where: { id: req.params.id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    return res.json(serializeRoute(route));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao atualizar rota.',
    });
  }
});

app.delete('/routes/:id', async (req, res) => {
  try {
    await prisma.route.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao excluir rota.',
    });
  }
});

/**
 * DELIVERIES
 */

app.get('/deliveries', async (_req, res) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      include: { history: true },
      orderBy: { updatedAt: 'desc' },
    });

    return res.json(deliveries.map(serializeDelivery));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar entregas.',
    });
  }
});

app.get('/deliveries/:id', async (req, res) => {
  try {
    const delivery = await prisma.delivery.findUnique({
      where: { id: req.params.id },
      include: { history: true },
    });

    if (!delivery) {
      return res.status(404).json({
        message: 'Entrega não encontrada.',
      });
    }

    return res.json(serializeDelivery(delivery));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar entrega.',
    });
  }
});

app.post('/deliveries', async (req, res) => {
  try {
    const data = deliverySchema.parse(req.body);

    const delivery = await prisma.delivery.create({
      data: {
        ...data,
        history: {
          create: {
            status: data.status,
            notes: 'Entrega registrada no sistema.',
          },
        },
      },
      include: {
        history: true,
      },
    });

    return res.status(201).json(serializeDelivery(delivery));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao criar entrega.',
    });
  }
});

app.patch('/deliveries/:id/status', async (req, res) => {
  try {
    const data = z
      .object({
        status: deliverySchema.shape.status,
        notes: z.string().optional(),
      })
      .parse(req.body);

    const delivery = await prisma.delivery.update({
      where: { id: req.params.id },
      data: {
        status: data.status,
        history: {
          create: {
            status: data.status,
            notes: data.notes,
          },
        },
      },
      include: {
        history: true,
      },
    });

    return res.json(serializeDelivery(delivery));
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao atualizar status da entrega.',
    });
  }
});

app.delete('/deliveries/:id', async (req, res) => {
  try {
    await prisma.delivery.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao excluir entrega.',
    });
  }
});

/**
 * DASHBOARD
 */

app.get('/dashboard/summary', async (_req, res) => {
  try {
    const [drivers, routes, deliveries, activeRoutes] = await Promise.all([
      prisma.driver.count(),
      prisma.route.count(),
      prisma.delivery.count(),
      prisma.route.count({
        where: {
          status: 'active',
        },
      }),
    ]);

    return res.json({
      drivers,
      routes,
      deliveries,
      activeRoutes,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao carregar dashboard.',
    });
  }
});

/**
 * ERROR HANDLER
 */

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Dados inválidos.',
        details: error.flatten(),
      });
    }

    console.error(error);

    return res.status(500).json({
      message: 'Erro interno na API local.',
    });
  }
);

/**
 * START
 */

app.listen(port, () => {
  console.log(`WLS Cargo API local rodando em http://localhost:${port}`);
});