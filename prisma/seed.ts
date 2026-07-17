import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Початок наповнення бази даних тестовими даними PostgreSQL...");

  // 1. Створення тестового користувача
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Олексій Тестовий",
      email: "test@example.com",
      phone: "+380991234567",
    },
  });

  console.log(`Створено/знайдено користувача: ${user.name} (${user.email})`);

  // Очищення попередніх тестових даних для уникнення дублювання
  await prisma.booking.deleteMany({ where: { userId: user.id } });
  await prisma.favorite.deleteMany({ where: { userId: user.id } });

  // 2. Створення тестових бронювань
  await prisma.booking.create({
    data: {
      userId: user.id,
      stationId: "rb-road",
      stationName: "ЗАРЯДНА СТАНЦІЯ RB ROAD",
      arriveTime: "10:30",
      duration: "1.5",
      totalPrice: 12.25,
      paymentMethod: "Кредитна картка",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дні тому
    },
  });

  await prisma.booking.create({
    data: {
      userId: user.id,
      stationId: "subway",
      stationName: "ЗАРЯДНА СТАНЦІЯ SUBWAY",
      arriveTime: "14:15",
      duration: "2",
      totalPrice: 19.50,
      paymentMethod: "Google Pay",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 день тому
    },
  });

  await prisma.booking.create({
    data: {
      userId: user.id,
      stationId: "charles",
      stationName: "ЗАРЯДНА СТАНЦІЯ CHARLES",
      arriveTime: "18:00",
      duration: "1",
      totalPrice: 7.55,
      paymentMethod: "Готівка",
      createdAt: new Date(), // сьогодні
    },
  });

  console.log("Створено 3 тестових бронювання.");

  // 3. Створення тестових обраних станцій
  await prisma.favorite.create({
    data: { userId: user.id, stationId: "rb-road" },
  });
  await prisma.favorite.create({
    data: { userId: user.id, stationId: "charles" },
  });

  console.log("Створено 2 обрані станції.");
  console.log("Наповнення бази даних успішно завершено! 🎉");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
