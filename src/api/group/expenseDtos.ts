export interface DebtorReadDto {
  debtorId: number;
  name: string;
  weight: number;
}

export interface ExpenseReadDto {
  expenseId: number;
  creditorMemberId: number;
  title: string;
  debtors: DebtorReadDto[];
  amount: number;
  currency: string;
  created: string;
}

export interface ExpenseParticipantDto {
  debtorId: number;
  weight: number;
}

export interface ExpenseCreateDto {
  title: string;
  creditorId: number;
  debtors: ExpenseParticipantDto[];
  amount: number;
  currencyAbbreviation: string;
}
