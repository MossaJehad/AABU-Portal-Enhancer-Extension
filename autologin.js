document.addEventListener('DOMContentLoaded', function () {
    var autoLogin = document.getElementById('autologin');
    
    autoLogin.addEventListener('change', function () {
        chrome.storage.sync.set({ autoLogin: this.checked });
    });

    chrome.storage.sync.get('autoLogin', function (data) {
        autoLogin.checked = data.autoLogin;
    });
});
