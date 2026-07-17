"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function initiateSignInAction(credential: string) {
  if (!credential) {
    return { error: "Введіть Email або номер телефону." };
  }

  try {
    // Find by email or phone
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: credential },
          { phone: credential },
        ],
      },
    });

    if (!user) {
      return { error: "Користувача не знайдено. Будь ласка, зареєструйтеся спочатку." };
    }

    return { success: true, redirect: `/auth/otp?credential=${encodeURIComponent(credential)}` };
  } catch (error) {
    console.error("Sign in initiate error:", error);
    return { error: "Щось пішло не так при спробі входу." };
  }
}

export async function initiateSignUpAction(name: string, email: string, phone: string) {
  if (!email || !name || !phone) {
    return { error: "Усі поля є обов'язковими." };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Користувач із такою електронною поштою вже існує." };
    }

    // Create user in local SQLite DB
    await db.user.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return { success: true, redirect: `/auth/otp?credential=${encodeURIComponent(email)}` };
  } catch (error) {
    console.error("Sign up initiate error:", error);
    return { error: "Щось пішло не так при реєстрації." };
  }
}

export async function verifyOtpAction(credential: string, otpCode: string) {
  if (!credential || !otpCode) {
    return { error: "Необхідно вказати контактні дані та код." };
  }

  if (otpCode !== "1234") {
    return { error: "Неправильний код підтвердження. Спробуйте 1234." };
  }

  try {
    // Find the user to create the session
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: credential },
          { phone: credential },
        ],
      },
    });

    if (!user) {
      return { error: "Користувача не знайдено." };
    }

    // Set permanent session cookie
    const cookieStore = await cookies();
    cookieStore.set(
      "session_user",
      JSON.stringify({ id: user.id, name: user.name, email: user.email }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 тиждень
        path: "/",
      }
    );

    return { success: true, redirect: "/" };
  } catch (error) {
    console.error("OTP verification error:", error);
    return { error: "Щось пішло не так при верифікації коду." };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_user");
  return { success: true };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_user");
  if (!session || !session.value) return null;

  try {
    return JSON.parse(session.value) as { id: string; name: string | null; email: string };
  } catch {
    return null;
  }
}
