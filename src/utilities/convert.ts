export function convertEmptyStringsToNull(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "string" && obj[key].trim() === "") {
      obj[key] = null;
    }
  }

  return obj;
}

export function convertEmptyStringsOrNullToStripe(obj: any) {
  for (const key in obj) {
    if (
      (typeof obj[key] === "string" && obj[key].trim() === "") ||
      typeof obj[key] === null
    ) {
      obj[key] = "-";
    }
  }

  return obj;
}

export function convertIntoAge(birth: Date): number {
  const birthdate = new Date(birth);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
  const ageInYears = Math.floor(
    ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );
  return ageInYears;
}
