"use server";

import { createMedicineSchema } from "@/schemas/zod";
import { createMedicineUseCase } from "@/use-cases/medicines";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const createMedicineAction = createServerAction()
  .input(createMedicineSchema)
  .handler(async ({ input: { title, description } }) => {
    await createMedicineUseCase({ title, description });
    revalidatePath("/");
  });
