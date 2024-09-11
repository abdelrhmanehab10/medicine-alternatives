"use client";

import { getUserAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createUserSchema } from "@/schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

export default function SignInPage() {
  const { toast } = useToast();
  const { isPending, execute } = useServerAction(getUserAction, {
    onSuccess() {
      redirect("/");
    },
    onError(err) {
      toast({ variant: "destructive", title: err.err.message });
    },
  });

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof createUserSchema>) {
    execute(values);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>تسجيل</CardTitle>
        <CardDescription>أدخل اسمك وكلمة السر للتسجيل</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الأسم</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Abdelrhman Ehab"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الألكتروني</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="badaal@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة السر</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="badaal123@"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-slate-900 hover:bg-slate-900/95 w-full"
            >
              تسجيل الدخول
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
