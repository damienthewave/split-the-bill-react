import { DailyPersonExpenses } from "../../api/statistics/statisticsDtos";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, ChartOptions, TooltipItem } from "chart.js";
import { LocalDate, LocalDateTime } from "@js-joda/core";
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { ExpenseReadDto } from "../../api/group/expenseDtos";

interface Props {
  allExpenses: DailyPersonExpenses
}

interface ChartExpenses {
  x: LocalDate,
  y: number,
  currency: string,
  expenses: ExpenseReadDto[]
}

const AllPersonExpensesPane = ({ allExpenses }: Props) => {

  const datasets: any[] = [];

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  allExpenses.forEach(((dateExpenses, currency) => {
    const currencyData: ChartExpenses[] = [];
    dateExpenses.forEach((expenses, date) => {
      currencyData.push({
        x: date,
        y: expenses.reduce((a, b) => a + b.amount, 0),
        expenses: expenses,
        currency: currency
      });
    });
    datasets.push({
      label: currency,
      data: currencyData.sort((a: ChartExpenses, b: ChartExpenses) => {
        const dateA = LocalDate.parse(a.x.toString())
        const dateB = LocalDate.parse(b.x.toString())
        return dateA.compareTo(dateB)
      }),
      borderColor: randomColor()
    });
  }));

  const data = {
    datasets: datasets
  };

  const options: ChartOptions = {
    plugins: {
      title: {
        text: 'Expenses You have paid for',
        position: "bottom",
        display: true
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title(tooltipItems: TooltipItem<any>[]): string | string[] {
            return tooltipItems.map(item => {
              const expenses = item.raw as ChartExpenses;
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: expenses.currency
              });
              return `${formatter.format(expenses.y)} on ${expenses.x}`;
            });
          },
          label(tooltipItem: TooltipItem<any>): string | string[] {
            const expenses = tooltipItem.raw as ChartExpenses;
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: expenses.currency
            });
            return expenses.expenses.map(expense => {
              return `${formatter.format(expense.amount)} '${expense.title}' at ${LocalDateTime.parse(expense.created).toLocalTime().toString()}`;
            });
          }
        }
      }
    },
    scales: {
      xAxis: {
        type: "time",
        adapters: {
          date: {
            locale: enUS
          }
        }
      },
      yAxis: {
        min: 0
      }
    }
  };

  return <div className="col-6 m-auto">
    <Line data={data} options={options} type='bubble' />
  </div>;
};

export default AllPersonExpensesPane;