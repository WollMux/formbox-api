# Konfiguration

## Fragmente
In der Datei fragments.json werden die Fragmente, die der Server ausliefert definiert. Der Schlüssel entspricht dabei der Fragment-ID. Eine ID ist eindeutig und kann dementsprechend auch nur maximal einmal vergeben werden. Der Wert eines Schlüssels entspricht dem Pfad zu dem Fragment auf Dateiebene.

## LDAP
In der Datei ldap.json wird die Verbindung zum LDAP-Server konfiguriert. Anonyme Verbindungsversuche werden nicht unterstützt.

| Schlüssel | Typ | Beschreibung |
| --------- | --- | ------------ |
| config.url | string | Die URL des LDAP-Servers |
| config.base | string | Die Wurzel für die Suchanfragen |
| config.dn | string | Distinguished Name des LDAP-Users mit dem die Suchanfragen ausgeführt werden |
| config.password | string | Das Passwort für den LDAP-User. |
| attributes | string[] | Die Attribute, die bei einer Suche zurückgeliefert werden |
| mapping | object | Die Attribute, welche von der Suche zurückgeliefert werden, werden auf andere Attributnamen gemapped. Dabei ist jeder Schlüssel vom Typ string. Der Wert entspricht dem ursprünglichen Attributnamen. Jedes Attribut, das im Ergebnis vorkommen soll, muss hier enthalten sein auch wenn sich der Attributname nicht ändert. |

Alternativ können die Umgebungsvariablen
* LDAP_DN: Distinguished Name des LDAP-Users und
* LDAP_PASSWORD: Passwort des LDAP-User

verwendet werden, um die Suchanfragen zu personalisieren.