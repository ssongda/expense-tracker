import { z } from "zod";

export const expenseCategorySchema = z.enum(["food", "transfer", "entertainment", "utility"]);

export const expenseSchema = z.object({
  id: z.number().optional(),
  category: z.string(),
  amount: z.string(),
  date: z.string(),
  year: z.number(),
  month: z.number(),
});

export type Expense = z.infer<typeof expenseSchema>;
