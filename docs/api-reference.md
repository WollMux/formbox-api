# Formbox API-Referenz

## Namen aller verfügbaren Vorlagen auf dem Server
```
GET https://localhost:4201/document/vorlagen
```
Response:
```
JSON ["vorlage1", "vorlage2", "vorlage3"]
```

## Namen aller verfügbaren Fragmente auf dem Server
```
GET https://localhost:4201/document/fragmente
```
Response:
```
JSON ["fragment1", "fragment2", "fragment3"]
```

## Bereitstellung eines gewünschten Fragments
```
GET https://localhost:4201/document/fragmente/<name>?base64=true
```
| Paramter name  | Typ           | Beschreibung            |
|----------------|---------------|------------------------|
| name           | string        |  Name des Fragments    |
| base64         | boolean TRUE/FALSE  |  Fragment als base64-string/Binary  |

Response:
```
JSON {"base64":"UEsDBBQAAAgAAKRreEtexjIMJwAAACcAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRv="}
```

## Bereitstellung einer gewünschten Vorlage
```
GET https://localhost:4201/document/vorlagen/<name>?base64=true
```
| Paramter name  | Typ           | Beschreibung            |
|----------------|---------------|------------------------|
| name           | string        |  Name der Vorlage    |
| base64         | boolean TRUE/FALSE  |  Vorlage als base64-string/Binary  |

Response:
```
JSON {"base64":"UEsDBBQAAAgAAKRreEtexjIMJwAAACcAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRv"}
```

## FormboxBar
```
GET https://localhost:4201/formboxbar
```
Response:
Der Inhalt der Datei formboxbar.json

## Abrufen von LDAP-Daten
```
GET https://localhost:4201/db/ldap?uid=max.mustermann&vorname=max&nachname=mustermann&ou=test
```
Mindestens einer der Parameter muss angegeben werden.
| Paramter name | Typ | Beschreibung |
| ------------- | --- | ------------ |
| uid | string | UID des Anwenders |
| vorname | string  | Vorname des Anwenders |
| nachname | string  | Nachname des Anwenders |
| ou | string  | Organisationseinheit des Anwenders |
Response:
```
JSON
[{uid: max.mustermann, vorname: max, nachname: mustermann, ou: test}]
```
Die Attribute der Antwort können konfiguriert werden (siehe [LDAP](konfiguration.md))
