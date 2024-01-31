var statusDiv = document.createElement('div');
var statusA = document.createElement('a')

statusDiv.id = 'status';
statusDiv.style.position = 'fixed';
statusDiv.style.top = '16px';
statusDiv.style.right = '50%';
statusDiv.style.backgroundColor = '#F8FAE5';
statusDiv.style.color = 'black';
statusDiv.style.transform = 'translateX(50%)';
statusDiv.style.padding = '8px 16px';
statusDiv.style.borderRadius = '5px';
statusDiv.style.boxShadow = 'rgba(7, 29, 63, 0.125) 0px 4px 16px';
statusDiv.style.fontWeight = 'bold';
statusDiv.style.zIndex = '100';
statusDiv.style.cursor = 'pointer';
statusDiv.style.display = 'flex';

var iconSpan = document.createElement('span');
iconSpan.classList.add('icon');
iconSpan.innerHTML = '<?xml version="1.0" ?><svg height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>';

var textSpan = document.createElement('span');
textSpan.classList.add('text');
textSpan.style.fontSize = '16px';
textSpan.textContent = 'أعد تحميل الصفحة لرؤية التغييرات';

statusA.setAttribute('href', 'https://student.aabu.edu.jo/nreg//welcome.jsp?')
statusA.setAttribute('target', '_self')
statusA.style.display = 'flex';
statusA.style.flexDirection = 'row';
statusA.style.alignContent = 'center'
statusA.style.justifyContent = 'center'
statusA.style.alignItems = 'center'
statusA.style.textDecoration = 'none'
statusA.style.color = 'black'

statusA.appendChild(iconSpan);
statusA.appendChild(textSpan);
statusDiv.appendChild(statusA)

document.body.appendChild(statusDiv);