const phoneMap = new Map();

export function validatePhone(phoneRow: string, index: number, rowId: number) {
  const phone = phoneRow.trim().toLocaleLowerCase();
  const cleaned = phoneRow.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{11})$/); // 11 with 1

  if (!match) {
    return {
      name: "Wrong phone format",
      row: "Phone",
      id: rowId,
    };
  }

  if (phoneMap.has(phone)) {
    return {
      name: "Duplicate",
      row: "Phone",
      id: rowId,
      duplicateId: String(phoneMap.get(phone) - 1),
    };
  } else {
    phoneMap.set(phone, index + 1);
  }
}
