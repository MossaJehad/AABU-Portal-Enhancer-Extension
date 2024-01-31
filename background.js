if (chrome.tabs && chrome.tabs.onUpdated) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg')) {
                chrome.storage.sync.get(['betterUI', 'darkMode', 'autoLogin'], function (data) {
                    if (data.betterUI) {
                        chrome.scripting.executeScript({
                            target: {tabId : getTabId()},
                            file: ['betterui.js']
                        });
                    }
                    if (data.darkMode) {
                        chrome.scripting.executeScript({
                            target: {tabId : getTabId()},
                            file: ['darkMode.js']
                        });
                    }

                    if (data.autoLogin) {
                        chrome.scripting.executeScript({
                            target: {tabId : getTabId()},
                            file: ['autologin.js']
                        });
                    }
                });
        }
    });
    chrome.tabs.onUpdated.addListener(function(details) {
        if (details.url.startsWith('https://student.aabu.edu.jo/nreg')) {
            chrome.scripting.executeScript({
                target: {tabId : getTabId()},
                file: ['darkMode.js']
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg/')) {
        chrome.storage.sync.get('darkModeEnabled', function(data) {
            if (data.darkModeEnabled) {
                chrome.scripting.executeScript({
                    target: {tabId : getTabId()},
                    file: ['contentScript.js']
                });
            }
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg/')) {
        chrome.storage.sync.get('betterUI', function(data) {
            if (data.betterUI) {
                chrome.scripting.executeScript({
                    target: {tabId : getTabId()},
                    file: ['contentScript.js']
                });
            }
        });
    }
});

let autoLoginState = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getAutoLoginState') {
        sendResponse({ autoLogin: autoLoginState });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.autoLogin) {
        autoLoginState = true;
        let form = document.querySelector('.signin');
        if (form) {
            form.submit();
        }
    } else {
        autoLoginState = false;
    }
});
