"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { cookies } from "next/headers";
import { ObjectId } from "bson";


const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

if (!prisma) {
  throw new Error("prisma is not initialized");
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자만 입력할 수 있어요!",
        required_error: "사용자 이름은 꼭 필요해요!",
      })
      .toLowerCase()
      .trim()
    // .transform((username) => `🔥 ${username} 🔥`)
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

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies())
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    try {

      const user = await prisma.user.create({
        data: {
          id: new ObjectId().toString(),
          username: result.data.username,
          email: result.data.email,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });
      const session = await getSession();
      session.id = user.id;
      await session.save();
      redirect("/expenses");
    } catch (errors) {
      console.log(errors)
      redirect("/");
    }
  }
}