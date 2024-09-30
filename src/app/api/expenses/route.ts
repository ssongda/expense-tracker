import { NextRequest, NextResponse } from 'next/server';
import { unformatNumber } from '@/utils/common/formatNumber';
import { prisma } from '@/lib/prisma';
import getSession from '@/lib/session';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const session = await getSession();

  if (!date) {
    return NextResponse.json({ status: 400, message: '유효하지 않은 날짜입니다.' });
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        date: date,
        userId: session.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error, status: 500, message: '서버에 문제가 있어요!' });
  }
}

export async function POST(request: NextRequest) {




  try {
    const session = await getSession();
    const body = await request.json();
    const { amount, category, date, year, month } = body;

    if (!amount || !category || !date || !year || !month || !session.id) {
      return NextResponse.json({ stateus: 400, message: '필요한 정보가 부족한 거 같은데요.' });
    }

    const newExpense = await prisma.expense.create({
      data: {
        amount: unformatNumber(amount),
        category,
        date,
        year,
        month,
        userId: session.id
      }
    });

    console.log(newExpense)
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