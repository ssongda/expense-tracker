
type Args = {
  ids: number[],
  refetchExpenses: () => Promise<void>;
}

export const deleteExpenses = async ({ ids, refetchExpenses }: Args) => {
  try {
    const response = await fetch('/api/expenses', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids
      })
    })

    if (!response.ok) {
      throw new Error('Failed to delete.')
    }

    await refetchExpenses();

  } catch (error) {
    throw new Error('Error occured.')
  }
}