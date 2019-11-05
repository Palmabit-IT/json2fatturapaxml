# JSON 2 FatturaPa XML

## Aggiungere traduzioni ad un linguaggio

### Steps:

1. Aprire il file **{LANG}.js** nella directory **src/joi-error-translations** ed aggiungere le nuove traduzioni prendendo riferimento dal seguente link: [https://github.com/hapijs/joi/blob/v14.3.1/lib/language.js](https://github.com/hapijs/joi/blob/v14.3.1/lib/language.js)

## Installare un nuovo linguaggio

### Steps:

1. Creare un nuovo file **{LANG}.js** nella directory **src/joi-error-translations** ed inserire le traduzioni seguendo il formato del file **IT.js**.
2. Importa il file usando **require()** nel file **src/validate.js**.
3. Inserire un nuovo **case:** dentro la switch statement all'interno del file.