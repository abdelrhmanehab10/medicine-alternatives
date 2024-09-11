"use server";

import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

import { createUserUseCase, getUserUseCase } from "@/use-cases/users";
import { createUserSchema, getUserSchema } from "@/schemas/zod";
import { createServerAction } from "zsa";
import { PublicError } from "@/use-cases/errors";

export const getUserAction = createServerAction()
  .input(getUserSchema)
  .handler(async ({ input: { email, password } }) => {
    const existingUser = await getUserUseCase({ email });
    if (!existingUser) {
      return {
        error: "خطأ في البريد الألكتروني او كلمة المرور",
      };
    }

    const validPassword = await verify(existingUser.password_hash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "خطأ في البريد الألكتروني او كلمة المرور",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  });

export const createUserAction = createServerAction()
  .input(createUserSchema)
  .handler(async ({ input: { username, email, password } }) => {
    const existingUser = await getUserUseCase({ email });
    if (existingUser) {
      throw new PublicError(
        "البريد الألكتروني مستخدم من قبل, عليك استخدام بريد اخر"
      );
    }
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    await createUserUseCase({
      id: userId,
      username,
      email,
      password_hash: passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  });
