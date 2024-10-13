"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { ObjectId } from "bson";
import { userFormSchema } from "@/domain/model/user";

export async function createAccount(_prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await userFormSchema.spa(data);

  if (!result.success) return result.error.flatten();

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
    redirect("/");
  }

}