# Google Drive Gallery

Statische Foto-Galerie-Website, die Bilder direkt aus Google Drive lädt. Gehostet auf GitHub Pages unter `gallery.dennis-gall-photography.com`.

## Technik

- Bilder kommen aus Google Drive via Drive API v3 (kein Login nötig)
- Bilder werden über `wsrv.nl` als Proxy geladen (verhindert Google Rate-Limiting)
- Service Worker cached alle Bilder lokal im Browser
- Kein Backend, keine Datenbank – alles läuft im Browser

## Dateien

| Datei | Funktion |
|-------|----------|
| `index.html` | Übersichtsseite mit allen Galerien |
| `gallery.html` | Einzelne Galerie mit Grid, Lightbox, Download |
| `style.css` | Styles (Dark/Light Mode, Proxima Nova + Raleway) |
| `sw.js` | Service Worker für Bild-Caching |
| `config.json` | API Key, Ordner-IDs, Seitentitel |

## config.json anpassen

```json
{
  "apiKey": "DEIN_API_KEY",
  "rootFolderId": "ID_DES_HAUPTORDNERS",
  "site": {
    "title": "Seitentitel",
    "subtitle": "Untertitel"
  },
  "galleries": {
    "ORDNER-ID": {
      "description": "Optionale Beschreibung",
      "coverImageId": "DATEI-ID-DES-TITELBILDS"
    }
  }
}
```

## Google Drive einrichten

1. Hauptordner in Google Drive erstellen
2. Für jede Galerie einen Unterordner anlegen und Bilder hochladen
3. **Jeden Unterordner** einzeln freigeben: Rechtsklick → Freigeben → „Jeder mit dem Link" → Betrachter
4. Die Ordner-ID aus der URL kopieren (`drive.google.com/drive/folders/DIESE-ID`)

> **Wichtig:** Google Drive vererbt Freigaben nicht automatisch an Unterordner. Jeder Ordner muss einzeln freigegeben werden.

## API Key

Der Key ist in `config.json` gespeichert und in der Google Cloud Console auf `https://gallery.dennis-gall-photography.com/*` und `http://localhost:8000/*` eingeschränkt.

Bei Änderungen am Key: Google Cloud Console → APIs & Services → Credentials.

## Deployment

Änderungen pushen:
```bash
git add -A && git commit -m "Update" && git push
```

GitHub Pages deployed automatisch innerhalb ~1 Minute.
