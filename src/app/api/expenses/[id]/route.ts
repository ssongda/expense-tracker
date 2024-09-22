import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;


  if (!id) {
    return NextResponse.json({ error: '유효하지 않은 아이디입니다.' }, { status: 400 });
  }

  try {
    await prisma.expense.delete({
      where: {
        id: Number(id)
      }
    });

    return NextResponse.json({ message: '삭제되었습니다.' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}