document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('maincontainer');
  var studentIdInput = form.querySelector('input[name="studentId"]');
  var studentPass = form.querySelector('input[name="password"]');
  var saveButton = form.querySelector('button');
  var successMessage = document.getElementById('successMessage');
  var storedStudentId = localStorage.getItem('studentId');
  var storedStudentPass = localStorage.getItem('studentPass');

  var autoLogin = document.querySelector('.autoLogin');
  var betterUI = document.querySelector('.applyBetterUI');
  var darkMode = document.querySelector('.darkMode');

  var passwordInput = document.getElementById('password');
  var togglePassword = document.querySelector('.toggle-password');

function applyDarkModeStyles() {
    let bdy = document.querySelector('body');
    bdy.style.backgroundColor = '#242424';
    bdy.style.color = '#eee';

    let form = document.querySelector('#maincontainer')
    if(form){
      form.style.color = '#eee'
      form.style.backgroundColor = '#343434'
    }
    let p = document.querySelector('.pborder')
    if(p){
      p.style.color = '#eee'
      p.style.backgroundColor = '#343434'
    }
    let a = document.querySelector('#link')
    if(a){
      a.style.color = '#209cee'
    }
    let span = document.querySelector('span')
    if(span){
      span.style.color = '#777'
    }
  
}

function removeDarkModeStyles() {
  let bdy = document.querySelector('body');
    bdy.style.backgroundColor = '';
    bdy.style.color = '';

    let form = document.querySelector('#maincontainer')
    if(form){
      form.style.color = ''
      form.style.backgroundColor = ''
    }
    let p = document.querySelector('.pborder')
    if(p){
      p.style.color = ''
      p.style.backgroundColor = ''
    }
    let a = document.querySelector('#link')
    if(a){
      a.style.color = ''
    }
    let span = document.querySelector('span')
    if(span){
      span.style.color = ''
    }
}

chrome.storage.local.get('darkModeEnabled', function (data) {
  if (data.darkModeEnabled) {
      applyDarkModeStyles();
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'local' && 'darkModeEnabled' in changes) {
      const newDarkModeState = changes.darkModeEnabled.newValue;
      if (newDarkModeState) {
          applyDarkModeStyles();
      } else {
          removeDarkModeStyles();
      }
  }
});

  togglePassword.addEventListener('click', function () {
      var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      togglePassword.classList.toggle('fa-eye');
      togglePassword.classList.toggle('fa-eye-slash');
  });

  if (storedStudentId) {
    studentIdInput.value = storedStudentId;
  }

  if (storedStudentPass) {
    studentPass.value = storedStudentPass;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (studentIdInput.value.length === 10 && studentPass.value !== '') {
      localStorage.setItem('studentId', studentIdInput.value);
      localStorage.setItem('studentPass', studentPass.value);
      chrome.storage.sync.set({ 'studentId': studentIdInput.value, 'studentPass': studentPass.value }, function () {
      });

      saveButton.removeAttribute('disabled');
      successMessage.classList.remove('is-hidden');
      setTimeout(function () {
        successMessage.classList.add('is-hidden');
        saveButton.setAttribute('disabled', 'disabled');
      }, 2000);
    }
  });

  studentIdInput.addEventListener('input', function () {
    if (studentIdInput.value.length === 10 && studentPass.value !== '') {
      saveButton.removeAttribute('disabled');
    } else {
      saveButton.setAttribute('disabled', 'disabled');
    }
  });

  studentPass.addEventListener('input', function () {
    if (studentIdInput.value.length === 10 && studentPass.value !== '') {
      saveButton.removeAttribute('disabled');
    } else {
      saveButton.setAttribute('disabled', 'disabled');
    }
  });
});

function setCheckboxState(key, checkboxElement) {
  chrome.storage.sync.set({ [key]: checkboxElement.checked }, function () {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}

function updateCheckboxState(key, checkboxElement) {
  chrome.storage.sync.get(key, function (data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      checkboxElement.checked = data[key];
    }
  });
}

autoLogin.addEventListener('change', function () {
  setCheckboxState('autoLogin', this);
});

updateCheckboxState('autoLogin', autoLogin);

betterUI.addEventListener('change', function () {
  setCheckboxState('betterUI', this);
});

updateCheckboxState('betterUI', betterUI);

darkMode.addEventListener('change', function () {
  setCheckboxState('darkMode', this);
});

updateCheckboxState('darkMode', darkMode);

betterUI.addEventListener('change', function () {
  setCheckboxState('betterUI', this);
  applyBetterUI(); 
});

updateCheckboxState('betterUI', betterUI);
