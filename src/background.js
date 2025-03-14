const apiKey = process.env.OPENAI_API_KEY;

// Default language value; will be updated from storage.
let languageOption = "Italian";

// Helper function to update the context menu title.
function updateLanguageContextMenu() {
  chrome.contextMenus.update("toggleLanguage", {
    title: `Language: ${languageOption}`
  });
}

// Initialize context menus after retrieving settings from storage.
chrome.storage.sync.get({ language: "Italian" }, (items) => {
  languageOption = items.language;
  chrome.contextMenus.create({
    id: "summarize",
    title: "Summarize: \"%s\"",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "explain",
    title: "Explain like I'm 5: \"%s\"",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "expand",
    title: "Expand: \"%s\"",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "toggleLanguage",
    title: `Language: ${languageOption}`,
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggleLanguage") {
    // Toggle between English and Italian.
    languageOption = languageOption === "English" ? "Italian" : "English";
    chrome.storage.sync.set({ language: languageOption }, () => {
      updateLanguageContextMenu();
    });
    return;
  }
  
  let instruction = "";
  if (info.menuItemId === "summarize") {
    instruction = "Summarize the following text:";
  } else if (info.menuItemId === "explain") {
    instruction = "Explain the following text like I'm 5:";
  } else if (info.menuItemId === "expand") {
    instruction = "Expand the following text, providing a detailed explanation and useful examples:";
  }
  
  // Use language setting to set the instruction.
  const languageInstruction = languageOption === "Italian" 
    ? "Rispondi in italiano." 
    : "Answer in English.";
  
  // Ask the model to return pure HTML.
  const formattingInstruction = "Please format your answer in pure HTML. Use appropriate HTML tags such as <h1>, <h2>, <strong>, <ul>, <li>, <pre> and <code> for any code blocks, ensuring the result is valid HTML.";

  const selectedText = info.selectionText;
  const prompt = `${instruction}\n\n${selectedText}\n\n${languageInstruction}\n\n${formattingInstruction}`;

  // Display spinner overlay.
  chrome.tabs.sendMessage(tab.id, { type: "displaySpinner" });
  
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 1,
      max_tokens: 5000
    })
  })
  .then(response => response.json())
  .then(data => {
    const reply = data.choices[0].message.content;
    chrome.tabs.sendMessage(tab.id, { type: "displayResult", text: reply });
  })
  .catch(err => {
    console.error("OpenAI API error:", err);
    chrome.tabs.sendMessage(tab.id, { type: "displayResult", text: "Error: Unable to get response." });
  });
});
