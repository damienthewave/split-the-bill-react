export interface DebtorReadDto{
  debtorId: number
  name: string
  weight: number
}

export interface ExpenseReadDto{
  expenseId: number
  creditorMemberId: number
  title: string
  debtors: DebtorReadDto[]
  amount: number
  currency: string
}