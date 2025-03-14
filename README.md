# summarino

summarino is a Chrome extension that enables users to summarize, explain, or expand selected text using OpenAI's GPT-4o Mini. It supports English and Italian and integrates seamlessly into the browser's context menu.

## Features
- **Summarize**: Generate a concise summary of selected text.
- **Explain Like I'm 5**: Get a simplified explanation of the content.
- **Expand**: Generate a detailed version with examples.
- **Toggle Language**: Switch between English and Italian for responses.
- **Formatted Output**: Responses are returned in clean HTML format.

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/summarino.git
   cd summarino
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the extension:
   ```sh
   npx webpack
   ```
4. Load the extension in Chrome:
   - Open `chrome://extensions/`.
   - Enable "Developer mode" (top-right corner).
   - Click "Load unpacked" and select the `dist/` directory.

## Usage
- Select any text on a webpage.
- Right-click and choose an option from the Summarino menu.
- The response will appear as a formatted overlay.
- Adjust settings in the popup (click on the extension icon).

## File Structure
```
- README.md
- package.json
- src/
  - background.js  # Handles API requests and context menus
  - content.js     # Injects UI elements for displaying responses
  - manifest.json  # Chrome extension configuration
  - popup.html     # Extension settings UI
  - popup.js       # Manages user settings
  - popup.css      # Styles for the popup UI
- webpack.config.js # Webpack configuration
```

## Environment Variables
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

## Contributing
Pull requests are welcome! Ensure your changes are well-documented.

## License
MIT License. Do whatever you whant.