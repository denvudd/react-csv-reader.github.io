import React from "react";
import { useCSVReader, formatFileSize } from "react-papaparse";

import { Button } from "./ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

import { validateAge } from "../lib/validators/age-validator";
import { validateEmail } from "../lib/validators/email";
import { validateExp } from "../lib/validators/exp";
import { validateIncome } from "../lib/validators/income";
import { validateExpirationDate } from "../lib/validators/expiration-date";
import { validatePhone } from "../lib/validators/phone";
import { validateLicenseNumber } from "../lib/validators/license";

import {
  type ErrorArray,
  HeadersEnum,
  type ValuesType,
  type HeadersType,
} from "../types";
import { cn, formatPhoneNumber } from "../lib/utils";

const CSVReader: React.FC = () => {
  const { CSVReader } = useCSVReader();

  const [columns, setColumns] = React.useState<HeadersType>([]);
  const [values, setValues] = React.useState<ValuesType>([]);
  const [errors, setErrors] = React.useState<ErrorArray | null>(null);

  const [isInvalidFormat, setIsInvalidFormat] = React.useState(false);
  const [isLogOpen, setIsLogOpen] = React.useState(false);

  const validateCSV = (results: any) => {
    const value: ValuesType = results.slice(1);
    const headers: HeadersType = results[0];

    if (
      !headers.includes("Phone") ||
      !headers.includes("Email") ||
      !headers.includes("Full Name")
    ) {
      setIsInvalidFormat(true);
    }

    console.log(value);

    const validationResult: ErrorArray = [];

    value.forEach((row, index) => {
      const idRow = row[HeadersEnum.Id] as number;
      const emailRow = row[HeadersEnum.Email] as string;
      const phoneRow = row[HeadersEnum.Phone] as string;
      const ageRow = row[HeadersEnum.Age] as number;
      const expRow = row[HeadersEnum.Experience] as number;
      const incomeRow = row[HeadersEnum.YearlyIncome] as number;
      const expirationDateRow = row[HeadersEnum.ExpirationDate] as string;
      const licenseNumberRow = row[HeadersEnum.LicenseNumber] as string;
      const duplicate = row[HeadersEnum.DuplicateWith] as number;

      const validatedEmail = validateEmail(String(emailRow), index, idRow);
      const validatedPhone = validatePhone(String(phoneRow), index, idRow);
      const validatedAge = validateAge(ageRow, idRow);
      const validatedExp = validateExp(expRow, idRow);
      const validatedIncome = validateIncome(incomeRow, idRow);
      const validatedExpirationDate = validateExpirationDate(
        expirationDateRow,
        idRow
      );
      const validatedLicenseNumber = validateLicenseNumber(
        licenseNumberRow,
        idRow
      );

      console.log("Validated Email: ", validatedEmail);
      console.log("Duplicate: ", duplicate);

      if (validatedEmail) {
        if (validatedEmail.duplicateId) {
          row[HeadersEnum.DuplicateWith] = validatedEmail.duplicateId;
        }

        validationResult.push(validatedEmail);
      }

      if (validatedPhone) {
        if (validatedPhone.duplicateId) {
          row[HeadersEnum.DuplicateWith] = validatedPhone.duplicateId;
        }

        validationResult.push(validatedPhone);
      }

      if (validatedAge) {
        validationResult.push(validatedAge);
      }

      if (validatedExp) {
        validationResult.push(validatedExp);
      }

      if (validatedIncome) {
        validationResult.push(validatedIncome);
      }

      if (validatedExpirationDate) {
        validationResult.push(validatedExpirationDate);
      }

      if (validatedLicenseNumber) {
        validationResult.push(validatedLicenseNumber);
      }
    });

    setColumns(headers);
    setValues(value);

    return validationResult;
  };

  const onUploadAccepted = React.useCallback((results: any) => {
    const value: string[][] = results.data;
    const filtered: ValuesType = value.slice(1).map((row, index) => {
      return [index + 1, ...row, ""];
    });

    const validationResult = validateCSV([
      ["ID", ...value[0], "Duplicate with"],
      ...filtered,
    ]);
    setErrors(validationResult);
  }, []);

  const handleOpenLog = React.useCallback(() => {
    setIsLogOpen(true);
  }, [setIsLogOpen]);

  const handleCloseLog = React.useCallback(() => {
    setIsLogOpen(false);
  }, [setIsLogOpen]);

  return (
    <CSVReader
      noDrag
      onUploadAccepted={onUploadAccepted}
      accept=".csv"
      config={{
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: (value: string | number | boolean, col: number) => {
          if (col === 1) {
            if (value !== "Phone") {
              formatPhoneNumber(String(value));
            }
          }

          return value;
        },
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
        <div className="mt-6">
          {acceptedFile ? (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="w-full font-medium">
                    Name:{" "}
                    <pre className="inline-block text-sm bg-slate-200 rounded-md px-2 py-1">
                      {acceptedFile.name}
                    </pre>
                  </p>
                  <p className="w-full font-medium">
                    Size:{" "}
                    <pre className="inline-block text-sm bg-slate-200 rounded-md px-2 py-1">
                      {formatFileSize(acceptedFile.size)}
                    </pre>
                  </p>
                  {errors && (
                    <p className="w-full font-medium">
                      Errors:{" "}
                      <pre className="inline-block text-sm bg-slate-200 rounded-md px-2 py-1">
                        {errors.length}
                      </pre>
                    </p>
                  )}
                  {errors && isLogOpen && (
                    <p className="w-full font-medium">
                      Errors Log:
                      <div className="flex flex-col gap-2 mt-2">
                        {errors.map((error, index) => (
                          <pre className="inline-block w-full text-sm bg-slate-200 rounded-md px-2 py-1">
                            Error on row {index + 1}: {error.name}
                          </pre>
                        ))}
                      </div>
                    </p>
                  )}
                  {errors && (
                    <div className="flex justify-start">
                      <Button
                        className="inline-block bg-red-600 text-white"
                        onClick={isLogOpen ? handleCloseLog : handleOpenLog}
                      >
                        {isLogOpen ? "Hide" : "Show"} Log
                      </Button>
                    </div>
                  )}
                </div>
                <div {...getRemoveFileProps()}>
                  <Button>Clear files</Button>
                </div>
              </div>
              {isInvalidFormat ? (
                <div className="mt-8 h-24 bg-red-300 text-black flex justify-center items-center flex-col text-2xl">
                  File format is not correct
                </div>
              ) : (
                <Table className="mt-8">
                  <TableHeader>
                    <TableRow>
                      {columns.length > 0 &&
                        columns.map((col: string, i: number) => (
                          <TableHead key={i}>{col}</TableHead>
                        ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {values.map(
                      (val: (string | number | boolean)[], i: number) => {
                        const currentID = val[0];
                        const errorsInRow = errors?.filter(
                          (error) => error.id === currentID
                        );

                        return (
                          <TableRow key={i}>
                            {val.map((v, j) => {
                              const isErrorInCell = errorsInRow?.some(
                                (error) => error.row === columns[j]
                              );

                              return (
                                <TableCell
                                  className={cn(
                                    isErrorInCell ? "bg-red-300" : undefined
                                  )}
                                  key={j}
                                >
                                  {String(v)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              )}
            </>
          ) : (
            <div {...getRootProps()} className="flex justify-center">
              <Button className="text-xl">Import Users</Button>
            </div>
          )}
        </div>
      )}
    </CSVReader>
  );
};

export default CSVReader;
