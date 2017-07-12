Das Projekt besteht aus zwei Parts (Client und Server). Die relevanten Dateien befinden sich (neben weniger Aunahmen, z.B. statische Dateien in public) im src Ordner.

## Client

In den Components sind die einzelnen Bereiche gruppiert. in den _pages Ordnern sind jeweils die Komponenten, die aus mehreren anderen Komponenten eine Seite zusammensetzen.
Sie werden in die App.js geladen. In dieser Datei sind die clientseitigen Routes definiert. 

Außer auf der Login-Seite (AuthPage, dazu gehört Auth/), wird ein Frame (Base/) geladen. Der Frame vereint Header, Sidebar und managed, welche Daten in den Child-Components zur Verfügung stehen.

Auf dem Dashboard werden die belegten Kurse angezeigt. Alles, was sich auf Kurse bezieht liegt in Courses/. Darin sind auch die Aufgaben (Tasks/).

Alle Kurse können bei "All Courses" gefunden werden, hier ist eine Sortierung nach Schwierigkeit möglich.

Das Einschreiben, Starten und Anlegen, sowie Bearbeiten von Aufgaben ist nach dem Klick auf die entsprechende Karte möglich.

Für Admin und Moderator stehen die Funktionen anlegen und bearbeiten von Kursen und Aufgaben zur Verfügung. Die Bereiche mit der entsprechendnen Berechtigung sind in Admin/ implementiert.

Außerdm steht dem Admin noch eine Übersicht der registrierten Nutzer_innen zur Verfügung. 

In den Einstellungen (Settings/) ist das Ändern der Daten (Passwort und E-Mail) möglich. 

## Server

Im Ordner src/server finden sich die Serverfiles. Hierbei handelt es sich um einen expressJS Server, der eine API bereitstellt.
Auf diese wird mittels Requests in React vom Client zugegriffen.

Einstiegspunkt ist die Datei server.js. In den einzelnen Ordnern finden sich Models (Kommunikation zur Datenbank), Controllers (Logik) und Routes.
Die verschiedenen route files werden von express verwendet. Teils ist eine Auth-Middleware vorgeschaltet, die checkt, ob ein User berechtigt ist.

Die User-Passwörter werden mittels bcrypt verschlüsselt in der Datenbank abgelegt. Die Authentifizierung erfolgt mittels eines Tokens (JWT).

## Zum Testen

Es wird eine lauffähige NodeJS LTS Installation benötigt. Unter Windows-Systemen müssen die Windows-Build-Tools installiert sein. Es wird eine laufende MongoDB Instanz benötigt (Port 27017).

Vor dem Start müssen alle Dependencies geladen werden `npm install` oder `yarn install`.

Im Anschluss kann das Projekt mittels `npm start` geladen werden. Es ist dann im Browser auf Port 3000 erreichbar.