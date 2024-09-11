import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import Medicines from "./_sections/medicines";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const search = searchParams.search;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <main className="text-center mt-3">
      <section>
        <h1>نبحث لك دائما عن بديل</h1>
        <form
          key={search}
          action={async (formData: FormData) => {
            "use server";
            const searchString = formData.get("search") as string;
            redirect(searchString ? `?search=${searchString}` : "/");
          }}
          className="w-1/4 mx-auto flex items-center mt-1"
        >
          <Input
            className="rounded-l-none focus-visible:ring-0"
            type="search"
            name="search"
            placeholder=".Carbimizole, Inderal, etc"
            defaultValue={search}
          />
          <Button className="rounded-r-none">بحث</Button>
        </form>
      </section>
      <section className="p-4">
        <Suspense fallback={<MedicinesListLoader />}>
          <Medicines />
        </Suspense>
      </section>
    </main>
  );
}

function MedicinesListLoader() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2">
      {new Array(7).fill("").map((_, idx) => {
        return <Skeleton key={idx} className="h-40 w-full" />;
      })}
    </div>
  );
}
