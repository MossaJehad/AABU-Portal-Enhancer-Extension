if (chrome.tabs && chrome.tabs.onUpdated) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg')) {
                chrome.storage.sync.get(['betterUI', 'darkMode', 'autoLogin'], function (data) {
                    if (data.betterUI) {
                        chrome.tabs.executeScript(tabId, {
                            file: 'betterui.js'
                        }, () => {
                            // console.log("Inserted betterui.js");
                        });
                    }

                    if (data.darkMode) {
                        chrome.tabs.executeScript(tabId, { 
                            file: 'darkMode.js' 
                        }, () => {
                            // console.log('darkMode.js injected');
                        }); 
                    }

                    if (data.autoLogin) {
                        chrome.tabs.executeScript(tabId, { 
                            file: 'autologin.js' 
                        }, () => {
                            // console.log('autologin.js injected');
                        });
                    }
                });
        }
    });
    chrome.webNavigation.onCompleted.addListener(function(details) {
        if (details.url.startsWith('https://student.aabu.edu.jo/nreg')) {
            chrome.tabs.executeScript(details.tabId, {
                file: 'darkMode.js'
            });
        }
    });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg/')) {
        chrome.storage.sync.get('darkModeEnabled', function(data) {
            if (data.darkModeEnabled) {
                chrome.tabs.executeScript(tabId, { file: 'contentScript.js' });
            }
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading' && tab.url.startsWith('https://student.aabu.edu.jo/nreg/')) {
        chrome.storage.sync.get('betterUI', function(data) {
            if (data.betterUI) {
                chrome.tabs.executeScript(tabId, { file: 'contentScript.js' });
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
        var form = document.querySelector('.signin');
        if (form) {
            form.submit();
        }
    } else {
        autoLoginState = false;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'openCalculatorPage') {
        chrome.tabs.create({ url: chrome.runtime.getURL('calculator/calc.html') });
    }
});
