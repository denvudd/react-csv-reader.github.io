import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{11})$/);
  
  if (match) {
    return "+1" + match[1];
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    return "+1" + cleaned.slice(1);
  } else if (cleaned.length === 10) {
    return "+1" + cleaned;
  } else {
    return "none";
  }
}
