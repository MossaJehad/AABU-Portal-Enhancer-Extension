let studentPas = document.querySelector('#password');
if (window.location.href.startsWith('https://student.aabu.edu.jo/nreg//showPic.jsp') || window.location.href.startsWith('https://student.aabu.edu.jo/nreg//StdFlag.jsp')) {
    window.location.href = 'https://student.aabu.edu.jo/nreg//welcome.jsp?';
    if (studentPas) {
        studentPas.setAttribute('autocomplete', 'true');
    }
}

chrome.storage.local.get('darkModeEnabled', function(data) {
    if (data.darkModeEnabled) {
        document.querySelectorAll('*').forEach((element) => { 
            if (element.tagName !== 'IMG') {
                element.originalBackgroundColor = window.getComputedStyle(element).backgroundColor;
                element.style.backgroundColor = '#222';
                element.style.color = '#fff';
            } else {
                element.style.backgroundColor = '';
                element.style.color = '';
            }
        });
    }
})

chrome.runtime.sendMessage({ action: 'getAutoLoginState' }, function (response) {
        chrome.storage.sync.get(['studentId', 'studentPass', 'autoLogin'], function (result) {
            const { studentId, studentPass, autoLogin } = result;
            if (studentId && studentPass) {
                try {
                    document.getElementById('UsrId').value = studentId;
                    document.getElementById('password').value = studentPass;
                    
                    if (autoLogin) {
                        document.getElementById('signin').submit();
                    }
                    
                    sendResponse({ status: 'done' });
                } catch (err) {
                    sendResponse({ status: 'An error occurred' });
                }
            } else {
                sendResponse({ status: 'done' });
            }
        });
});

function isExamPage() {
    return window.location.href.startsWith('https://student.aabu.edu.jo/nreg/brw_exam');
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.autoLogin) {
        let form = document.querySelector('.signin');
        if (form) {
            form.submit();
        }
    }
});

function autoSelectMiddleValueAndClickNext() {
    let table = document.querySelector('form[name="f1"] table');

    if (table) {
        let rows = table.getElementsByTagName('tr');
        let middleRowIndex = Math.floor(rows.length / 2);
        let middleRow = rows[middleRowIndex];

        let radioButton = middleRow.querySelector('input[type="radio"]');
        if (radioButton) {
            radioButton.click();

            let nextButton = document.querySelector('input[value="التالي"]');
            if (nextButton) {
                nextButton.click();
            }
        }
    }
}

if (isExamPage()) {
    autoSelectMiddleValueAndClickNext();
}

chrome.storage.local.get('UIEnabled', function(data) {
    if (data.UIEnabled) {
        document.querySelector("#content").classList.remove("content", "container-fluid");
        let aabu_logo = document.querySelector("#header img");
        aabu_logo.src = "https://www.aabu.edu.jo/_layouts/15/AABUResp/EN/img/arabic.png";
        aabu_logo.width = 200;
        aabu_logo.style.marginRight = '10px';

        let header = document.querySelector("#header");
        header.classList.remove("hed");
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent ='space-between';
        header.style.backgroundColor = "#02828d";
        header.style.padding = "10px";
        header.style.marginBottom = "12px";
        header.style.height = '100px';

        let svgLink = document.createElement('a');
        svgLink.href = chrome.runtime.getURL('calculator/calc.html');
        svgLink.setAttribute("id", "calculator-link");
        svgLink.setAttribute("target", "_blank");
        svgLink.style.display = 'flex';
        svgLink.style.alignItems = 'center';
        svgLink.style.margin = '12px'
        svgLink.addEventListener('click', function (event) {
            // event.preventDefault();
            chrome.runtime.sendMessage({ action: 'openCalculatorPage' });
        });

        let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('fill', 'none');
        svgElement.setAttribute('width', '50px');
        svgElement.setAttribute('stroke-width', '1.5');
        svgElement.setAttribute('viewBox', '0 0 24 24');

        let pathElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement1.setAttribute('d', 'M1 21V3a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2');
        pathElement1.setAttribute('stroke', '#d6d6d6');
        pathElement1.setAttribute('class', 'stroke-000000');

        let pathElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement2.setAttribute('d', 'M15 7h4M15 15.5h4M15 18.5h4M5 7h2m2 0H7m0 0V5m0 2v2M5.586 18.414 7 17m1.415-1.414L7 17m0 0-1.414-1.414M7 17l1.415 1.414');
        pathElement2.setAttribute('stroke', '#d6d6d6');
        pathElement2.setAttribute('stroke-linecap', 'round');
        pathElement2.setAttribute('stroke-linejoin', 'round');
        pathElement2.setAttribute('class', 'stroke-000000');

        svgElement.appendChild(pathElement1);
        svgElement.appendChild(pathElement2);

        svgLink.appendChild(svgElement);
        header.appendChild(svgLink);

        document.querySelector('p.copRight').classList.add('has-text-white')
        document.querySelector('p.copRight').style.backgroundColor = '#02828d'

        let sect = document.querySelector('section.foot')
        sect.style.backgroundColor = '#02828d';
        sect.classList.remove('foot')

        let breadCrumb = document.getElementsByClassName("col-lg-12")[0];
        breadCrumb.remove();

        let mainBody = document.querySelector(".main-body");
        mainBody.classList.remove("main-body");
        mainBody.classList.add("container");

        let bulma = document.createElement('link');
        bulma.rel = 'stylesheet';
        bulma.href = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';

        let headElement = document.head || document.getElementsByTagName('head')[0] || document.getElementsByTagName('head');
        headElement.appendChild(bulma);

        let buttons = document.querySelectorAll('button');

        buttons.forEach(function(button) {
            button.className = '';
            button.classList.add('button', 'is-primary');
            button.style.backgroundColor = '#02828d';
            button.style.color = '#FFF';
        });

        document.querySelector('.navbar-header').remove()
        document.querySelector('.navbar', '.navbar-default', '.col-lg-2', '.col-md-3').classList.add('p-0')
        document.querySelector('#navcol-1').classList.add('m-0')

        let div1 = document.querySelector('div[style="width: 100%; height: 60px; background-color: #FF0;  margin: auto; text-align: center"]')
        div1.style.height = '25px';
        div1.style.backgroundColor = '';
        div1.style.margin = '0px';
        div1.style.textAlign = '';

        let aButton = document.querySelector('a[href="/nreg/dalel_mod2022_2023.pdf"]')
        aButton.classList.remove('btn')
        aButton.classList.add('button')

        let additionalDiv = document.createElement('div');
        additionalDiv.classList.add('card', 'mt-3');

        let rowForSignOutLink = document.createElement('div');
        rowForSignOutLink.classList.add('row');

        let colForSignOutLink = document.createElement('div');
        colForSignOutLink.classList.add('col-sm-12', 'has-text-centered');

        let signOutLink = document.createElement('a');
        signOutLink.setAttribute('href', 'https://student.aabu.edu.jo/nreg/SignOut');
        signOutLink.setAttribute('target', '_self');
        signOutLink.classList.add('button');
        signOutLink.textContent = 'تسجيل الخروج';

        colForSignOutLink.appendChild(signOutLink);
        rowForSignOutLink.appendChild(colForSignOutLink);
        additionalDiv.appendChild(rowForSignOutLink);
        document.querySelector('.col-md-4.mb-3').appendChild(additionalDiv);

    }

});
