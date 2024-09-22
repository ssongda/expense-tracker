import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { unformatNumber } from '@/utils/common/formatNumber';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ status: 400, message: '유효하지 않은 날짜입니다.' });
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
    return NextResponse.json({ error, status: 500, message: '서버 오류가 발생했습니다.' });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, category, date, year, month } = body;


    if (!amount || !category || !date || !year || !month) {
      return NextResponse.json({ stateus: 400, message: '必須フィールドが欠けています' });
    }


    const newExpense = await prisma.expense.create({
      data: {
        amount: unformatNumber(amount),
        category,
        date,
        year,
        month
      }
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error, status: 500, message: '서버 오류가 발생했습니다.' });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ status: 400, message: 'No valid IDs provided.' });
    }

    const newExpense = await prisma.expense.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error, status: 500, message: '서버 오류가 발생했습니다.' });
  }
}