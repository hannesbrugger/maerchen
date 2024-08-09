#!/bin/bash

# Überprüfen, ob das API-Token-Argument übergeben wurde
if [ -z "$1" ]; then
  echo "MAILERSEND_API_KEY-Token wurde nicht übergeben."
  exit 1
fi

if [ -z "$2" ]; then
  echo "SUPABASE_ANON_KEY-Token wurde nicht übergeben."
  exit 1
fi

if [ -z "$3" ]; then
  echo "SUPABASE_URL-Token wurde nicht übergeben."
  exit 1
fi

MAILERSEND_API_KEY="$1"
SUPABASE_ANON_KEY="$2"
SUPABASE_URL="$3"

# Pfad zur Markdown-Datei, die als Argument übergeben wird

MD_FILE="$4"

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
MAILTEXT=$(grep '^MailText:' "$MD_FILE" | sed 's/^MailText: //')

# Debug-Ausgabe (kann entfernt werden)
echo "Titel: $TITEL"
echo "Bild: $BILD"
echo "Beschreibung: $BESCHREIBUNG"
echo "Datum: $DATUM"
echo "Uhrzeit: $UHRZEIT"
echo "Dauer: $DAUER"
echo "Ort: $ORT"
echo "MAILTEXT: $MAILTEXT"

mails=$(curl 'https://trokjaduhgjllgfnevoq.supabase.co/rest/v1/emails?select=*' \
  -H "apikey: $SUPABASE_ANON_KEY \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY)

# Überprüfen, ob die Antwort erfolgreich war
if [ -z "$mails" ]; then
  echo "Keine Daten empfangen oder ein Fehler ist aufgetreten."
  exit 1
fi

# Verwenden von jq zum Parsen der JSON-Daten
echo "$mails" | jq -c '.[] | "\(.name) \(.mail)"' | while IFS= read -r line; do
  # Trennen von Name und Mail
  name=$(echo "$line" | awk '{print $1}')
  mail=$(echo "$line" | awk '{print $2}')

  # Verwende die Variablen `name` und `mail`
  echo "Name: $name, Mail: $mail"

  # Erstellen der JSON-Daten mit den extrahierten Werten
  JSON_DATA=$(
    cat <<EOF
{
    "from": {
        "email": "info@domain.com"
    },
    "to": [
        {
            "email": "$mail"
        }
    ],
    "variables": [{
        "email": "$mail",
        "substitutions": [
            {
                "var": "Ort",
                "value": "$ORT"
            },
            {
                "var": "Titel",
                "value": "$TITEL"
            },
            {
                "var": "Datum",
                "value": "$DATUM"
            },
            {
                "var": "Uhrzeit",
                "value": "$UHRZEIT"
            },
            {
                "var": "Dauer",
                "value": "$DAUER"
            },
            {
                "var": "MailText",
                "value": "$MailText"
            },
            {
                "var": "action_url",
                "value": "/action"
            },
                        {
                "var": "name",
                "value": "$name"
            },
            {
                "var": "support_url",
                "value": "/support"
            }
        ]
    }],
    "template_id": "pr9084z335vlw63d"
}
EOF
  )

  curl -X POST \
    https://api.mailersend.com/v1/email \
    -H 'Content-Type: application/json' \
    -H 'X-Requested-With: XMLHttpRequest' \
    -H "Authorization: Bearer $MAILERSEND_API_KEY" \
    -d "$JSON_DATA"
done
