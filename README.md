# Text Processor Extension

Questa estensione Chrome consente agli utenti di evidenziare del testo su una pagina web e, tramite il menu contestuale, inviare il testo a OpenAI per ottenere diverse elaborazioni (riassunto, spiegazione in stile "spiega come se avessi 5 anni" o espansione dettagliata). L'output viene visualizzato in un modal overlay con formattazione HTML.

## Requisiti

- [Node.js](https://nodejs.org/) (consigliata l'ultima LTS)
- npm (incluso in Node.js)
- Chrome (o un browser basato su Chromium) in modalità sviluppatore

## Struttura del Progetto

La struttura di base del progetto è la seguente:

```
my-extension/
├── src/
│   ├── background.js        # Script per la gestione dei menu contestuali e chiamate API
│   ├── content.js           # Script per visualizzare spinner e modal overlay con l'output
│   └── manifest.json        # Manifest dell'estensione (Manifest V3)
├── .env                     # File per definire le variabili d'ambiente (non incluso nel repo)
├── package.json             # Configurazione npm
└── webpack.config.js        # Configurazione di Webpack per bundling e copia dei file
```

## Configurazione

1. **Clona il repository**

   ```bash
   git clone https://github.com/tuo-username/nome-repo.git
   cd nome-repo
   ```

2. **Installa le dipendenze**

   Assicurati di avere Node.js installato, quindi esegui:

   ```bash
   npm install
   ```

3. **Configura il file .env**

   Crea un file `.env` nella radice del progetto (lo stesso livello di `package.json`) e aggiungi la tua API key per OpenAI:

   ```env
   OPENAI_API_KEY=la_tua_api_key
   ```

   *Nota: Per ragioni di sicurezza, questo file non deve essere incluso nel repository pubblico.*

## Build dell'Estensione

Utilizza Webpack per creare il bundle dell'estensione. Il file `webpack.config.js` è configurato per:

- Bundlare i file `background.js` e `content.js` in `dist/` (rispettivamente come `background.js` e `content.js`)
- Copiare il file `manifest.json` nella cartella `dist/`

Per eseguire la build, esegui:

```bash
npx webpack
```

Dopo la build, la cartella `dist/` conterrà i file necessari per l'estensione.

## Caricare l'Estensione in Chrome

1. Apri Chrome e vai a `chrome://extensions/`
2. Abilita la modalità sviluppatore (Developer mode) in alto a destra.
3. Clicca su **"Carica estensione non pacchettizzata"** (Load unpacked) e seleziona la cartella `dist/` del progetto.
4. L'estensione verrà caricata e sarà disponibile per l'uso.

## Funzionamento dell'Estensione

- **Menu contestuale:**  
  Quando evidenzi del testo su una pagina web, facendo clic destro appariranno le seguenti opzioni:
  - **Summarize:** Riassume il testo selezionato.
  - **Explain like I'm 5:** Spiega il testo in modo semplice.
  - **Expand:** Fornisce una spiegazione dettagliata con esempi.
  - **Toggle Language:** Permette di scegliere tra risposte in italiano e in inglese.

- **Spinner e Modal Overlay:**  
  Durante la chiamata all'API viene visualizzato uno spinner. Al termine, il risultato (formattato in HTML) viene mostrato in un modal overlay.

## Personalizzazione

- **Modifica del prompt:**  
  Nel file `background.js` puoi modificare il prompt inviato all'API per adattarlo alle tue esigenze, aggiungendo ulteriori istruzioni o modificando il formato.

- **Stili CSS:**  
  Nel file `content.js` sono definiti gli stili per il modal overlay e il contenuto formattato. Puoi personalizzarli ulteriormente modificando il codice CSS in linea o spostandolo in un file separato.

## Note di Sicurezza

Ricorda che, nelle estensioni Chrome, il codice è eseguito lato client e le variabili d'ambiente (come l'API key) vengono incluse nel bundle finale. Per una maggiore sicurezza, valuta l'uso di un server proxy che gestisca le chiamate all'API.

## Contributi

Se desideri contribuire o migliorare il progetto, sei libero di aprire una pull request o contattarmi.