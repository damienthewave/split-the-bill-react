import { LocalDate } from "@js-joda/core";
import { ExpenseReadDto } from "../group/expenseDtos";

export type DailyPersonExpenses = Map<string, Map<LocalDate, ExpenseReadDto[]>>