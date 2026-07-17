import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/app/auth/_actions/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { getStationById } from "@/lib/mockStations";

export const metadata: Metadata = {
  title: "Особистий кабінет | KIA EV",
  description: "Керуйте своїм профілем, переглядайте історію бронювань та список улюблених зарядних станцій.",
};

export default async function ProfilePage() {
  const sessionUser = await getSessionUser();

  // Якщо не авторизований — редирект на вхід з поверненням сюди
  if (!sessionUser) {
    redirect("/auth/sign-in?redirect=/profile");
  }

  // Отримуємо повні та свіжі дані користувача з бази даних
  const dbUser = await db.user.findUnique({
    where: { id: sessionUser.id },
  });

  if (!dbUser) {
    redirect("/auth/sign-in?redirect=/profile");
  }

  // Отримуємо бронювання з Supabase
  const bookings = await db.booking.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  // Отримуємо обрані станції з Supabase
  const favorites = await db.favorite.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  // Форматування дати
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
      {/* Welcome banner */}
      <div className="rounded-3xl bg-[#0A0A0A] p-6 text-white md:p-8 relative overflow-hidden shadow-xl shadow-black/10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl -translate-y-12 translate-x-12" />
        <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl translate-y-12" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/15 text-2xl font-bold font-mono">
              {dbUser.name ? dbUser.name[0].toUpperCase() : dbUser.email[0].toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-bold text-[#9A9A9A] tracking-wider uppercase">
                Ласкаво просимо
              </span>
              <h1 className="text-2xl font-black tracking-tight mt-0.5">
                {dbUser.name || "Користувач"}
              </h1>
            </div>
          </div>

          <div className="flex gap-6 border-t border-white/10 pt-4 md:border-none md:pt-0">
            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400">Бронювань</span>
              <span className="text-xl font-black text-primary">{bookings.length}</span>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="block text-[10px] uppercase font-bold text-gray-400">Обраних</span>
              <span className="text-xl font-black text-secondary">{favorites.length}</span>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="block text-[10px] uppercase font-bold text-gray-400">Статус</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                Еко-Драйвер
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-3xl border border-gray-150 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-dark border-b border-gray-50 pb-3 uppercase tracking-wider">
              Контактна інформація
            </h3>
            <div className="mt-4 space-y-4 text-xs">
              <div>
                <span className="block font-bold text-gray-400 uppercase">Email</span>
                <span className="text-sm font-medium text-gray-700 mt-1 block">{dbUser.email}</span>
              </div>
              {dbUser.phone && (
                <div>
                  <span className="block font-bold text-gray-400 uppercase">Телефон</span>
                  <span className="text-sm font-medium text-gray-700 mt-1 block">{dbUser.phone}</span>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <form
                action={async () => {
                  "use server";
                  const { signOutAction } = await import("@/app/auth/_actions/auth");
                  await signOutAction();
                  redirect("/");
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-red-50 py-3 text-center text-xs font-bold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Вийти з акаунту
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bookings and Favorites list */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active / Past Bookings */}
          <div className="rounded-3xl border border-gray-150 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-dark border-b border-gray-50 pb-4 uppercase tracking-wider flex items-center justify-between">
              <span>📅 Історія бронювань</span>
              <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2.5 py-1 rounded-full">
                всього {bookings.length}
              </span>
            </h2>

            {bookings.length === 0 ? (
              <div className="py-12 text-center">
                <span className="text-4xl">⚡</span>
                <p className="mt-4 text-xs font-bold text-gray-400">У вас немає активних бронювань.</p>
                <Link
                  href="/ev/network"
                  className="mt-4 inline-block text-xs font-black text-primary hover:underline"
                >
                  Знайти станцію зарядок →
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wide">
                        {booking.stationName}
                      </h4>
                      <p className="mt-1 text-[11px] text-gray-500">
                        Час: <span className="font-semibold text-dark">сьогодні о {booking.arriveTime}</span> ({booking.duration === "1.5" ? "1 год 30 хв" : `${booking.duration} год`})
                      </p>
                      <p className="mt-1 text-[10px] text-gray-400">
                        Сплачено через: <span className="font-medium">{booking.paymentMethod}</span> • Створено: {formatDate(booking.createdAt)}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                      <span className="text-sm font-black text-primary">
                        ${booking.totalPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Підтверджено
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Stations */}
          <div className="rounded-3xl border border-gray-150 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-dark border-b border-gray-50 pb-4 uppercase tracking-wider">
              ❤️ Обрані станції
            </h2>

            {favorites.length === 0 ? (
              <div className="py-12 text-center">
                <span className="text-4xl font-normal text-gray-300">🤍</span>
                <p className="mt-4 text-xs font-bold text-gray-400">Списку обраного немає.</p>
                <p className="mt-1 text-[10px] text-gray-400">Натискайте ❤️ на сторінках станцій, щоб додавати їх сюди.</p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((fav) => {
                  const station = getStationById(fav.stationId);
                  if (!station) return null;
                  return (
                    <div
                      key={fav.id}
                      className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-dark uppercase tracking-wide line-clamp-1">
                            {station.name}
                          </h4>
                          <span className="text-[10px] text-primary font-bold">📍 {station.distance}</span>
                        </div>
                        <p className="mt-1 text-[10px] text-gray-400 line-clamp-2">{station.address}</p>
                        <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase">
                          🔌 Конектор: {station.connectionType}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-primary">
                          ${station.pricePerKwh}/кВт·год
                        </span>
                        <Link
                          href={`/ev/station/${station.id}`}
                          className="rounded-lg bg-gray-900 text-white px-3 py-1.5 text-[10px] font-bold hover:bg-primary transition-colors cursor-pointer"
                        >
                          Детальніше →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
