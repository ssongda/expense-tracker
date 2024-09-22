// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './../../../../../lib/prisma';


export async function addExpense(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string)
  const category = formData.get('category') as string
  const date = new Date(formData.get('date') as string)

  await prisma.expense.create({
    data: { amount, category, date },
  })

  revalidatePath('/expenses')
}

export async function deleteExpense(id: number) {
  await prisma.expense.delete({
    where: { id },
  })

  revalidatePath('/expenses')
}