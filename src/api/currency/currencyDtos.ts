export interface CurrencyReadDto {
  id: number
  abbreviation: string
  exchangeRate: number
}

export const emptyCurrencyCollection: CurrencyReadDto[] = [];
