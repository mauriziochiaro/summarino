document.addEventListener('DOMContentLoaded', function() {
  // Load the saved language setting (default to Italian)
  chrome.storage.sync.get({ language: 'Italian' }, function(data) {
    document.getElementById('language').value = data.language;
  });
  
  // Listen for form submission to save the setting.
  document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const language = document.getElementById('language').value;
    chrome.storage.sync.set({ language: language }, function() {
      // Update status message.
      const status = document.getElementById('status');
      status.textContent = 'Settings saved!';
      setTimeout(function() {
        status.textContent = '';
      }, 2000);
    });
  });
});
