"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { createMedicineAction } from "@/actions";
import { createMedicineSchema } from "@/schemas/zod";
import { useToast } from "@/hooks/use-toast";

const AddMedicine = () => {
  const { isOpen, onClose } = useModal();
  const { toast } = useToast();
  const { isPending, execute, error } = useServerAction(createMedicineAction, {
    onSuccess() {
      toast({ title: "تم أضافة الدواء بنجاح" });
      onClose();
    },
    onError(err) {
      toast({ title: err.err.message });
    },
  });

  const form = useForm<z.infer<typeof createMedicineSchema>>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: {
      title: "Carbimazole",
      description:
        "دواء يُستخدم لعلاج فرط نشاط الغدة الدرقية، وهي حالة تحدث عندما تفرز الغدة الدرقية كميات زائدة من الهرمونات.",
    },
  });

  function onSubmit(values: z.infer<typeof createMedicineSchema>) {
    execute(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">أضافة دواء</DialogTitle>
          <DialogDescription className="text-right">
            تأكد من أن المعلومات دقيقة وحديثة لضمان توفير أفضل الخيارات للمرضى
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>أسم الدواء</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف الدواء</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                حفظ
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicine;
