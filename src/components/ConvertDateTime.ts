import { string } from "astro/zod";

interface Props {
    dateStr: string,
    timeStr: string,
}

export function ConvertDateTime({ dateStr, timeStr }: Props) {
    // Teile das Datum in Tag, Monat und Jahr
    let date;
    console.log(dateStr, timeStr)
    if (typeof dateStr === 'string' && typeof timeStr === 'string') {
        const [day, month, year] = dateStr.split('-').map(Number);


        // Teile die Uhrzeit in Stunden und Minuten
        const [hours, minutes] = timeStr.split(':').map(Number);

        date = new Date(year, month - 1, day, hours, minutes);
    }


    // Erstelle ein neues Date-Objekt


    return date;
}
