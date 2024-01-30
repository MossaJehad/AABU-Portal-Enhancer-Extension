document.addEventListener('DOMContentLoaded', function () {
       
        var checkbox = document.getElementById('darkModeCheckbox');

        chrome.storage.local.get('darkModeEnabled', function (data) {
            checkbox.checked = data.darkModeEnabled;
            updateDarkMode(checkbox.checked);
        });

        checkbox.addEventListener('change', function () {
            var darkModeEnabled = checkbox.checked;

            chrome.storage.local.set({ 'darkModeEnabled': darkModeEnabled }, function () {
                if (!chrome.runtime.lastError) {
                    updateDarkMode(darkModeEnabled);
                } else {
                    console.error(chrome.runtime.lastError);
                }
            });
        });

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.action === 'toggleDarkMode') {
                checkbox.checked = request.darkModeEnabled;
                updateDarkMode(checkbox.checked);
            }
        });
});

async function updateDarkMode(darkModeEnabled) {
    var code = darkModeEnabled
    ? `document.querySelectorAll('*').forEach((element) => { 
        if (element.tagName !== 'IMG') {
            element.originalBackgroundColor = window.getComputedStyle(element).backgroundColor;
            element.style.backgroundColor = '#222';
            element.style.color = '#fff';
        } else {
            element.style.backgroundColor = '';
            element.style.color = '';
        }
    });`
    : `document.querySelectorAll('*').forEach((element) => {
        if (element.tagName === 'SECTION') {
            element.style.backgroundColor = '#02828d';
            element.style.color = '#fff';
        } else if (element.id === 'header') {
            element.style.backgroundColor = '#02828d';
            element.style.color = '#fff';
        } else {
            if (element.tagName == 'IMG') {
                element.style.backgroundColor = element.originalBackgroundColor;
            }
            element.style.color = '';
            element.style.backgroundColor = '';
        }
    });`;
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tabId = tabs[0].id;
      chrome.scripting.executeScript(tabId, { code: code });
  });
}
