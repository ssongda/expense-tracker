// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addExpense(formData: FormData) {
  const amount = parseInt(formData.get('amount') as string)
  const category = formData.get('category') as string
  const date = formData.get('date') as string

  await prisma.expense.create({
    data: { amount, category, date, year: parseInt(date.split('-')[0]), month: parseInt(date.split('-')[1]) },
  })

  revalidatePath('/expenses')
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({
    where: { id },
  })

  revalidatePath('/expenses')
}