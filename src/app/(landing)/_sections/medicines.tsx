import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime } from "@/lib/utils";
import { getMedicinesUseCase } from "@/use-cases/medicines";
import { EllipsisVertical } from "lucide-react";
import React from "react";

type Props = {};

const Medicines = async (props: Props) => {
  const medicines = await getMedicinesUseCase();

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4">
      {medicines?.map((medicine) => (
        <Card key={medicine.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-right">{medicine.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                  {/* TODO: edit medicine dialog open => on dropdown item click */}
                  <DropdownMenuItem className="justify-end">
                    تعديل
                  </DropdownMenuItem>
                  {/* TODO: why delete medicine dialog open => on dropdown item click then delete it */}
                  <DropdownMenuItem className="justify-end focus:bg-red-500 focus:text-white">
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="text-right">
              {medicine.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-between">
            <Badge className="bg-green-700 text-xs">متاح</Badge>
            <p className="text-xs">{formatRelativeTime(medicine.createdOn)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Medicines;
