const emailMap = new Map();

export function validateEmail(emailRow: string, index: number, rowId: number) {
  if (typeof emailRow === "string") {
    const email = emailRow.trim().toLocaleLowerCase();

    if (emailMap.has(email)) {
      return {
        name: "Duplicate",
        row: "Email",
        id: rowId,
        duplicateId: String(emailMap.get(email) - 1),
      };
    } else {
      emailMap.set(email, index + 1);
    }
  } else {
    return {
      name: "Email is not a string",
      row: "Email",
      id: rowId
    };
  }
}
