import { z } from "zod";

export const createMedicineSchema = z.object({
  title: z.string().min(2, {
    message: "يجب ان لا يقل اسم الدواء عن حرفيين",
  }),
  description: z.string().min(10, {
    message: "يجب ان لا يقل وصف الدواء عن 10 حروف",
  }),
});

export const getUserSchema = z.object({
  email: z.string().email({
    message: "يجب ان يكون البريد الألكتروني صالح للأستخدام",
  }),
  password: z
    .string()
    .min(8, {
      message: "يجب ان لا تقل كلمة السر عن 8 حروف",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "يجب ان تحتوي كلمة السر علي حرف ورقم وحرف خاص. مثال: badaael123@"
    ),
});

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "يجب ان لا يقل الأسم عن 3 حروف",
    })
    .max(24, {
      message: "يجب ان لا يزيد الأسم عن 24 حرف",
    }),
  email: z.string().email({
    message: "يجب ان يكون البريد الألكتروني صالح للأستخدام",
  }),
  password: z
    .string()
    .min(8, {
      message: "يجب ان لا تقل كلمة السر عن 8 حروف",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "يجب ان تحتوي كلمة السر علي حرف ورقم وحرف خاص. مثال: badaael123@"
    ),
});
