#!/bin/bash

# Pfad zur Markdown-Datei, die als Argument übergeben wird
MD_FILE="$1"

# Überprüfen, ob die Datei existiert
if [ ! -f "$MD_FILE" ]; then
  echo "Datei $MD_FILE existiert nicht."
  exit 1
fi

# Extrahiere die Werte aus dem YAML-Frontmatter
TITEL=$(grep '^Titel:' "$MD_FILE" | sed 's/^Titel: //')
BILD=$(grep '^Bild:' "$MD_FILE" | sed 's/^Bild: //')
BESCHREIBUNG=$(grep '^Beschreibung:' "$MD_FILE" | sed 's/^Beschreibung: //')
DATUM=$(grep '^Datum:' "$MD_FILE" | sed 's/^Datum: //')
UHRZEIT=$(grep '^Uhrzeit:' "$MD_FILE" | sed 's/^Uhrzeit: //')
DAUER=$(grep '^Dauer:' "$MD_FILE" | sed 's/^Dauer: //' | sed 's/^\[\(.*\)\]$/\1/')
ORT=$(grep '^Ort:' "$MD_FILE" | sed 's/^Ort: //')

# Debug-Ausgabe (kann entfernt werden)
echo "Titel: $TITEL"
echo "Bild: $BILD"
echo "Beschreibung: $BESCHREIBUNG"
echo "Datum: $DATUM"
echo "Uhrzeit: $UHRZEIT"
echo "Dauer: $DAUER"
echo "Ort: $ORT"
