const apiKey = process.env.OPENAI_API_KEY;

// Global language option variable
let languageOption = "Italian"; // default

chrome.runtime.onInstalled.addListener(() => {
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
    // Toggle language between English and Italian.
    languageOption = languageOption === "English" ? "Italian" : "English";
    chrome.contextMenus.update("toggleLanguage", {
      title: `Language: ${languageOption}`
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
  
  // Add language instruction based on the toggle.
  const languageInstruction = languageOption === "Italian" 
    ? "Rispondi in italiano." 
    : "Answer in English.";
  
  // Instruct the model to format the output using Markdown
  //const formattingInstruction = "Please format your answer using Markdown with headings, bullet points, and code blocks for clarity.";
  const formattingInstruction = "Please format your answer in pure HTML. Use appropriate HTML tags such as <h1>, <h2>, <strong>, <ul>, <li>, <pre> and <code> for any code blocks, ensuring the result is valid HTML.";

  const selectedText = info.selectionText;
  const prompt = `${instruction}\n\n${selectedText}\n\n${languageInstruction}\n\n${formattingInstruction}`;

  // Show spinner overlay in the current tab.
  chrome.tabs.sendMessage(tab.id, { type: "displaySpinner" });
  
  // Call the OpenAI API with model 'gpt-4o-mini'
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`  // Replace YOUR_API_KEY securely.
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
