# Installation

## Voraussetzungen

* [NodeJs](https://nodejs.org/de/) - NodeJs
* [OpenSSL](https://www.openssl.org/source/) - OpenSSL um Zertifikate zu generieren.

 
## Projekt starten

### Abhängigkeiten installieren
Im root-Verzeichnis erforderliche Abhängigkeiten über

```
npm install
```
installieren.

### Zertifikate
Die Anwendung basiert auf SSL, daher muss für den lokalen Betrieb ein selbstsigniertes Zertifikat mit privatem Schlüssel erstellt werden.

#### Privaten Schlüssel erstellen

```
openssl genrsa -des3 -out server.key 1024
```

#### CSR generieren

```
openssl req -new -key server.key -out server.csr
```

Passwortabfrage des privaten Schlüssels entfernen da sonst bei jedem Neustart des Webservices das Passwort erneut eingegeben werden müsste.

```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

#### Selbstsigniertes Zertifikat generieren

```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

Der Pfad des Privaten Schlüssels und der Zertifikatsdatei muss in der Konfigurationsdatei (.env) korrekt gesetzt sein.


#### Applikation starten:

```
npm start
```
