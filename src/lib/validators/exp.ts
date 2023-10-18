export function validateExp(exp: number, rowId: number) {
  if (typeof exp !== "number") {
    return {
      name: "Experience is not a number",
      row: "Experience",
      id: rowId,
    };
  }

  if (exp < 0 || exp > 21) {
    return {
      name: "Experience is less than 0 or greater than 21",
      row: "Experience",
      id: rowId,
    };
  }
}
