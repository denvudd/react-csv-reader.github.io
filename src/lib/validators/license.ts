export function validateLicenseNumber(licenseNumber: string, rowId: number) {
  const regex = /^[a-zA-Z0-9]{6}$/;

  if (!regex.test(licenseNumber)) {
    return {
      name: "Wrong License number format",
      row: "License number",
      id: rowId,
    };
  }
}
