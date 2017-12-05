# Programmierrichtlinien

## Kommentare
* Alle Kommentare und Commit-Messages sind auf deutsch zu verfassen.
* Jede Klasse und Public-Members/Methoden sind zu dokumentieren.

## Layout
* Öffnende Klammern kommen in die selbe Zeile
* Nur eine Anweisung pro Zeile
* UTF8 Encoding
* 2 Leerzeichen zum Einrücken
* Leerzeile am Ende jeder Datei
* Semicolon am Ende jeder Zeile
* Double Quotes für Strings

## [Anuglar-tslint-rules](https://www.npmjs.com/package/angular-tslint-rules#rules "")
* Erfordert tslint mindestens in Version 5.8.0
* Anpassungen
    * ```/// <reference path=>``` ist nur für OfficeJS erlaubt (no-reference)
    * Array-Definitionen sehen wie in Java aus ```T[]``` (array-type)
    * Conditianal Statements werden nicht für Zuweisungen bevorzugt (prefer-conditional-expression)
    * Vertikales Alignment für Variablen, Anweisungen und Parameter (align)
    * Radix Parameter bei parseInt muss nicht immer angegeben werden (radix)
    * Geschweifte Klammern müssen immer gesetzt werden (curly)
    * Es muss keine Leerzeile vor einer Return-Anweisung stehen (newline-before-return)
    * Var Keyword ist verboten (no-var-keyword)
* Codelyzer Regeln
    * Gelten nicht für FormBox-API, da es sich um spezielle Regeln für Angular handelt

## Code
* Sprechende Namen sollen für Variablen, Klassen, Methoden verwendet werden. Ausgenommen sind Zählvariablen.
* Parameter sind ```const``` und sollten nicht verändert werden.
* Verwende ```let``` für Variablen-Deklarationen und ```const``` für Konstanten.
* Single Responsiblity Principle
* Dont Repeat Yourself (DRY)
* Angular Style Guide

## Pull-Request
* Ein Pull-Request wird nur akzeptiert wenn:
    * Test-Fälle vorhanden sind.
    * Sich an das Layout gehalten wurde.
    * Sich an die Code-Richtlinien gehalten wurde.