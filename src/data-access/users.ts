import { db } from "@/db";
import { lower, NewUser, users } from "@/schemas/drizzle";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
}

export async function createUser(newUser: NewUser) {
  return await db.insert(users).values(newUser);
}
