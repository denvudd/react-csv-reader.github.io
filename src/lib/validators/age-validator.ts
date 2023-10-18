export function validateAge(age: number, rowId: number) {
    if (typeof age !== "number") {
      return {
        name: "Age is not a number",
        row: "Age",
        id: rowId,
      };
    }
  
    if (age < 21) {
      return {
        name: "Age is less than 21",
        row: "Age",
        id: rowId,
      };
    }
  }
  