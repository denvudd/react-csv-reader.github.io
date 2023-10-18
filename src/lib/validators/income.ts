export function validateIncome(income: number, rowId: number) {
  const incomeRegex = /^\d+(\.\d{1,2})?$/;

  if (typeof income !== "number") {
    return {
      name: "Yearly Income is not a number",
      row: "Yearly Income",
      id: rowId,
    };
  }

  if (income < 0) {
    return {
      name: "Yearly Income is less than 0",
      row: "Yearly Income",
      id: rowId,
    };
  }

  if (income > 1000000) {
    return {
      name: "Yearly Income is greater than 1000000",
      row: "Yearly Income",
      id: rowId,
    };
  }

  if (!incomeRegex.test(income.toString())) {
    return {
      name: "Yearly Income have more than 2 digits after decimal point",
      row: "Yearly Income",
      id: rowId,
    };
  }
}
