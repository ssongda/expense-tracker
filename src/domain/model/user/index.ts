import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const userSchema = z.object({
  avatar: z.string().nullable(),
  id: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  password: z.string().nullable(),
  github_id: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
}).nullable()

export type UserType = z.infer<typeof userSchema>



export const userFormSchema = z.object({
  username: z
    .string({
      invalid_type_error: "문자만 입력할 수 있어요!",
      required_error: "사용자 이름은 꼭 필요해요!",
    })
    .toLowerCase()
    .trim()
  ,
  email: z.string().email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
})
  .superRefine(async ({ username }, ctx) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });
      if (user) {
        ctx.addIssue({
          code: "custom",
          message: "이름 짓기가 쉽지 않죠?",
          path: ["username"],
          fatal: true,
        });
        return z.NEVER;
      }
    } catch (error) {
      console.error("Invalid username:", error);
      ctx.addIssue({
        code: "custom",
        message: "사용자 이름에 문제가 있나 봐요!",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이메일이에요! 전에 만난 적이 있나요?",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "똑같이 입력해 주세요!",
    path: ["confirm_password"],
  });

function checkPasswords({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) {
  return password === confirm_password;
}