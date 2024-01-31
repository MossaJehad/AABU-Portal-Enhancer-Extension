document.addEventListener('DOMContentLoaded', function () {
    let uicheckbox = document.getElementById('applyBetterUI');

    chrome.storage.local.get('UIEnabled', function (data) {
        uicheckbox.checked = data.UIEnabled;
    });

    uicheckbox.addEventListener('change', function () {
        let UIEnabled = uicheckbox.checked;
        chrome.storage.local.set({ 'UIEnabled': UIEnabled }, function () {
            if (!chrome.runtime.lastError) {
                updateUI(UIEnabled);
            } else {
                console.error(chrome.runtime.lastError);
            }
        });
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'toggleUI') {
            uicheckbox.checked = request.UIEnabled;
            updateUI(uicheckbox.checked);
        }
    });
});

function updateUI(UIEnabled) {
    executeAddStatusHTML();
}

function executeAddStatusHTML() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['addStatusHTML.js']
        });
    });
}
