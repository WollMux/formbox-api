## Formbox API-Referenz ##

#### Namen aller verfügbaren Vorlagen auf dem Server ####
```
GET https://localhost:4201/config/vorlagen
```
Response:
```
JSON ["vorlage1", "vorlage2", "vorlage3"]
```
<br></br>
#### Namen aller verfügbaren Fragmente auf dem Server ####
```
GET https://localhost:4201/config/fragmente
```
Response:
```
JSON ["fragment1", "fragment2", "fragment3"]
```
<br></br>
#### Bereitstellung eines gewünschten Fragments ####
```
GET https://localhost:4201/document/fragmente?name=test&base64=true
```
| Paramter name  | Typ           | Beschreibung            |
|----------------|---------------|------------------------|
| name           | string        |  Name des Fragments    |
| base64         | boolean TRUE/FALSE  |  Fragment als base64-string/Binary  |

Response:
```
JSON {"base64":"UEsDBBQAAAgAAKRreEtexjIMJwAAACcAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRv="}
```

<br></br>
#### Bereitstellung einer gewünschten Vorlage ####
```
GET https://localhost:4201/document/vorlagen?name=test&base64=true
```
| Paramter name  | Typ           | Beschreibung            |
|----------------|---------------|------------------------|
| name           | string        |  Name der Vorlage    |
| base64         | boolean TRUE/FALSE  |  Vorlage als base64-string/Binary  |

Response:
```
JSON {"base64":"UEsDBBQAAAgAAKRreEtexjIMJwAAACcAAAAIAAAAbWltZXR5cGVhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRv"}
```

