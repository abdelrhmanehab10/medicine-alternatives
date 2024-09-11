import { sql, SQL } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  uniqueIndex,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password_hash: text("password").notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  })
);

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const medicines = pgTable("medicines", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdOn: timestamp("created_on", { mode: "date" }).notNull(),
});

export type NewMedicine = typeof medicines.$inferInsert;
export type Medicine = typeof medicines.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
