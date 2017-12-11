# formbox-api

formbox-api basiert auf einer NodeJs-Express REST-API und stellt erforderliche Prozesse wie LDAP-Anfragen, Auslieferung von Vorlagen und weitere Funktionalit�t f�r die formbox bereit.

## Voraussetzungen

[NodeJs](https://nodejs.org/de/) - NodeJs
[OpenSSL](https://www.openssl.org/source/) - OpenSSL um Zertifikate zu generieren.

 
## Projekt starten

### Abh�ngigkeiten installieren
Im root-Verzeichnis erforderliche Abh�ngigkeiten �ber

```
npm install
```
installieren.

### Zertifikate
Die Anwendung basiert auf SSL, daher muss f�r den lokalen Betrieb ein selbstsigniertes Zertifikat mit privatem Schl�ssel erstellt werden.

#### Privaten Schl�ssel erstellen

```
openssl genrsa -des3 -out server.key 1024
```

#### CSR generieren

```
openssl req -new -key server.key -out server.csr
```

Passwortabfrage des privaten Schl�ssels entfernen da sonst bei jedem Neustart des Webservices das Passwort erneut eingegeben werden m�sste.

```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

#### Selbstsigniertes Zertifikat generieren

```
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

Der Pfad des Privaten Schl�ssels und der Zertifikatsdatei muss in der Konfigurationsdatei (.env) korrekt gesetzt sein.


#### Applikation starten:

```
npm start
```
  