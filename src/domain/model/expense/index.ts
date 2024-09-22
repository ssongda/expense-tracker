import { z } from "zod";

export const expenseCategorySchema = z.enum(["식비", "교통비", "오락", "공과금"]);

export const expenseSchema = z.object({
  id: z.number().optional(),
  category: z.string(),
  amount: z.string(),
  date: z.string(),
  year: z.number(),
  month: z.number(),
});

export type Expense = z.infer<typeof expenseSchema>;
