import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: '유효하지 않은 날짜입니다.' }, { status: 400 });
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        date: date
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, category, date, year, month } = body;

    if (!amount || !category || !date || !year || !month) {
      return NextResponse.json({ error: '必須フィールドが欠けています' }, { status: 400 });
    }

    const newExpense = await prisma.expense.create({
      data: {
        amount,
        category,
        date,
        year,
        month
      }
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

