import { type CollectionEntry } from "astro:content";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { ConvertDateTime } from "./ConvertDateTime";


type Props = CollectionEntry<"blog">["data"];

export function GetICS({
    Titel,
    Bild,
    Beschreibung,
    Datum,
    Uhrzeit,
    Dauer,
    Ort,
    GoogleMaps,
    Preis,
    Newsletter

}: Props) {
    const date = ConvertDateTime({ dateStr: Datum, timeStr: Uhrzeit });
    const event = {
        title: Titel,
        description: `${Beschreibung}\nWo?: \n${Ort}\n${GoogleMaps ? GoogleMaps : ""}`,
        start: date,
        duration: Dauer,
        location: Ort
    };

    return ics(event)
}
