
export function ConvertDate(Datum: string) {
    const [day, month, year] = Datum.split("-").map(Number);
    return new Date(year, month - 1, day);
};