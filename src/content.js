  // Ascolta i messaggi inviati dal background script.
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "displaySpinner") {
      showSpinner();
    } else if (message.type === "displayResult") {
      removeSpinner();
      showModalOverlay(message.text);
    }
  });
  
  function showSpinner() {
    const existingSpinner = document.getElementById("openai-spinner");
    if (existingSpinner) existingSpinner.remove();
  
    const spinnerOverlay = document.createElement("div");
    spinnerOverlay.id = "openai-spinner";
    Object.assign(spinnerOverlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10000"
    });
  
    const spinner = document.createElement("div");
    spinner.id = "spinner";
    Object.assign(spinner.style, {
      width: "50px",
      height: "50px",
      border: "6px solid #f3f3f3",
      borderTop: "6px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    });
  
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    spinnerOverlay.appendChild(style);
    spinnerOverlay.appendChild(spinner);
    document.body.appendChild(spinnerOverlay);
  }
  
  function removeSpinner() {
    const spinnerOverlay = document.getElementById("openai-spinner");
    if (spinnerOverlay) spinnerOverlay.remove();
  }
  
  // Usa marked.parse() per convertire il Markdown in HTML (versioni recenti di marked).
  function convertMarkdown(markdownText) {
    if (window.marked && typeof window.marked.parse === "function") {
      return window.marked.parse(markdownText);
    } else {
      // Fallback semplice se marked non è disponibile.
      return markdownText.replace(/\n/g, "<br>");
    }
  }
  
  function showModalOverlay(resultText) {
    const existingOverlay = document.getElementById("openai-overlay");
    if (existingOverlay) existingOverlay.remove();
  
    const overlay = document.createElement("div");
    overlay.id = "openai-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10000",
      padding: "10px"
    });
  
    const modal = document.createElement("div");
    modal.id = "openai-modal";
    modal.classList.add("openai-modal"); // per gli stili aggiuntivi
    Object.assign(modal.style, {
      backgroundColor: "#1f1f1f",
      color: "#c0c0c0",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "80vh",
      overflowY: "auto",
      fontFamily: "monospace"
    });
  
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
  
    const title = document.createElement("h2");
    title.textContent = "Result";
    title.style.margin = "0";
    title.style.fontSize = "1.25rem";
  
    const closeButton = document.createElement("button");
    closeButton.textContent = "✖";
    Object.assign(closeButton.style, {
      background: "none",
      border: "none",
      fontSize: "1.25rem",
      cursor: "pointer"
    });
    closeButton.addEventListener("click", () => overlay.remove());
  
    //header.appendChild(title);
    header.appendChild(closeButton);
    modal.appendChild(header);
  
    const content = document.createElement("div");
    content.style.marginTop = "1em";
    // Converte il Markdown ricevuto in HTML
    //content.innerHTML = convertMarkdown(resultText);
    content.innerHTML = resultText;
    modal.appendChild(content);
  
    // Stili CSS per una migliore formattazione del Markdown
    const markdownStyle = document.createElement("style");
    markdownStyle.textContent = `
      .openai-modal pre {
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
      }
      .openai-modal code {
        background-color: #f4f4f4;
        padding: 2px 4px;
        border-radius: 4px;
      }
      .openai-modal h1, 
      .openai-modal h2, 
      .openai-modal h3, 
      .openai-modal h4, 
      .openai-modal h5, 
      .openai-modal h6 {
        font-family: monospace;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      .openai-modal p {
        line-height: 1.5;
        margin-bottom: 1em;
      }
      .openai-modal ul {
        margin-left: 1.5em;
        margin-bottom: 1em;
      }
      .openai-modal strong {
        font-weight: bold;
      }
    `;
    overlay.appendChild(markdownStyle);
  
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }
  