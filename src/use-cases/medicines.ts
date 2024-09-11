import { createMedicine, getMedicines } from "@/data-access/medicines";

export async function getMedicinesUseCase() {
  const medicines = await getMedicines();
  return medicines;
}

export async function createMedicineUseCase({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  await createMedicine({
    title,
    description,
    createdOn: new Date(),
  });
}
