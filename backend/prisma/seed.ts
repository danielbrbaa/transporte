import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.deliveryHistory.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.route.deleteMany();
  await prisma.driver.deleteMany();

  const driver1 = await prisma.driver.create({ data: { name: 'Carlos Henrique', cpf: '123.456.789-00', phone: '(81) 98888-1111', status: 'active' } });
  const driver2 = await prisma.driver.create({ data: { name: 'Marcos Antônio', cpf: '987.654.321-00', phone: '(81) 97777-2222', status: 'active' } });
  const driver3 = await prisma.driver.create({ data: { name: 'Roberto Lima', cpf: '456.789.123-00', phone: '(81) 96666-3333', status: 'inactive' } });

  const route1 = await prisma.route.create({ data: { origin: 'Recife - PE', destination: 'Jaboatão dos Guararapes - PE', clientName: 'Essencial Cargo', driverId: driver1.id, date: new Date(), value: 850, observations: 'Coleta e entrega door-to-door.', status: 'active' } });
  const route2 = await prisma.route.create({ data: { origin: 'Recife - PE', destination: 'Cabo de Santo Agostinho - PE', clientName: 'LATAM Cargo', driverId: driver2.id, date: new Date(), value: 1250, observations: 'Carga aérea com prioridade.', status: 'active' } });

  await prisma.delivery.create({ data: { routeId: route1.id, driverId: driver1.id, clientName: 'Essencial Cargo', address: 'Av. Mascarenhas de Morais, Recife - PE', status: 'entregue', history: { create: { status: 'entregue', notes: 'Entrega realizada com sucesso.' } } } });
  await prisma.delivery.create({ data: { routeId: route2.id, driverId: driver2.id, clientName: 'LATAM Cargo', address: 'Aeroporto Internacional do Recife', status: 'contestacao_enviada', history: { create: { status: 'contestacao_enviada', notes: 'Contestação enviada para validação operacional.' } } } });
  await prisma.delivery.create({ data: { routeId: route1.id, driverId: driver3.id, clientName: 'RB Transportes', address: 'Imbiribeira, Recife - PE', status: 'nok', history: { create: { status: 'nok', notes: 'Ocorrência registrada para acompanhamento.' } } } });
}

main().finally(async () => prisma.$disconnect());
