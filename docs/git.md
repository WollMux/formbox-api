# Git

## Git aufsetzen
1) Einen neuen Fork des Repositorys anlegen
2) Das geforkte Repository clonen
```
git clone https://github.com/<user>/formbox-api.git
```
3) Einen neuen Remote einrichten
```
git remote add upstream https://github.com/wollmux/formbox-api.git
```

## Git verwenden

### Änderungen bereitstellen
* Alle Änderungen erfolgen zu allererst im eigenen Repository. Das heißt die Änderungen werden dort in einem neuen Branch gepusht.
* Wenn man zufrieden mit den Änderungen ist, dann kann ein Pull Request erstellt werden. Dieser wird dann gereviewt und schließlich in den master-Branch des Hauptrepositorys gemerget.

### Neueste Änderungen synchronisieren
1) Auf den master Branch wechseln
```
git checkout master
```
2) Das Hauptrepsoitory pullen (sollte das Hauptrepository unter einem anderen Remote eingetragen sein, dann muss upstream entsprechend ersetzt werden)
```
git pull upstream master
```
3) Den eigenen master aktualisieren
```
git push origin master
```
