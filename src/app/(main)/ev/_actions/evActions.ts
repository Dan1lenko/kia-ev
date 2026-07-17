"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/app/auth/_actions/auth";

export interface BookingData {
  stationId: string;
  stationName: string;
  arriveTime: string;
  duration: string;
  totalPrice: number;
  paymentMethod: string;
}

/**
 * Creates a new booking in the database for the current logged-in user.
 */
export async function createBookingAction(data: BookingData) {
  const user = await getSessionUser();
  if (!user) {
    return { error: "Для здійснення бронювання необхідно авторизуватися." };
  }

  try {
    const booking = await db.booking.create({
      data: {
        userId: user.id,
        stationId: data.stationId,
        stationName: data.stationName,
        arriveTime: data.arriveTime,
        duration: data.duration,
        totalPrice: data.totalPrice,
        paymentMethod: data.paymentMethod,
      },
    });

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error("Помилка створення бронювання:", error);
    return { error: "Не вдалося зберегти бронювання у базі даних." };
  }
}

/**
 * Retrieves all bookings made by the current user.
 */
export async function getUserBookingsAction() {
  const user = await getSessionUser();
  if (!user) return [];

  try {
    return await db.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Помилка отримання бронювань:", error);
    return [];
  }
}

/**
 * Toggles a station as favorite for the current user.
 */
export async function toggleFavoriteAction(stationId: string) {
  const user = await getSessionUser();
  if (!user) {
    return { error: "Необхідно авторизуватися, щоб додавати станції в обране." };
  }

  try {
    const existing = await db.favorite.findUnique({
      where: {
        userId_stationId: {
          userId: user.id,
          stationId,
        },
      },
    });

    if (existing) {
      await db.favorite.delete({
        where: {
          id: existing.id,
        },
      });
      return { success: true, isFavorite: false };
    } else {
      await db.favorite.create({
        data: {
          userId: user.id,
          stationId,
        },
      });
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error("Помилка перемикання обраного:", error);
    return { error: "Не вдалося оновити статус обраного." };
  }
}

/**
 * Checks if a specific station is marked as favorite by the current user.
 */
export async function isStationFavoriteAction(stationId: string) {
  const user = await getSessionUser();
  if (!user) return false;

  try {
    const favorite = await db.favorite.findUnique({
      where: {
        userId_stationId: {
          userId: user.id,
          stationId,
        },
      },
    });
    return !!favorite;
  } catch (error) {
    console.error("Помилка перевірки обраного:", error);
    return false;
  }
}

/**
 * Retrieves all favorite station IDs for the current user.
 */
export async function getUserFavoritesAction() {
  const user = await getSessionUser();
  if (!user) return [];

  try {
    const favorites = await db.favorite.findMany({
      where: { userId: user.id },
      select: { stationId: true },
    });
    return favorites.map((f) => f.stationId);
  } catch (error) {
    console.error("Помилка отримання обраних станцій:", error);
    return [];
  }
}
