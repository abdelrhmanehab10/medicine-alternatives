import { db } from "@/db";
import { medicines, NewMedicine } from "@/schemas/drizzle";

export async function getMedicines() {
  return await db.query.medicines.findMany();
}

export async function createMedicine(newMedicine: NewMedicine) {
  return await db.insert(medicines).values(newMedicine);
}
