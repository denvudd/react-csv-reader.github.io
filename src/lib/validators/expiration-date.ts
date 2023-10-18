import isMatch from "date-fns/isMatch";

export function validateExpirationDate(date: string, rowId: number) {
  if (isMatch(date, "yyyy-MM-dd")) {
    if (new Date(date) < new Date()) {
      return {
        name: "Expiration date is less than current date",
        row: "Expiration date",
        id: rowId,
      };
    }
    return; 
  } else if (isMatch(date, "MM/dd/yyyy")) {
    return; 
  } else {
    return {
      name: "Expiration date format is not valid",
      row: "Expiration date",
      id: rowId,
    };
  }
}
